import { Dir } from "./game/field";
import Executable from "./subClasses/executable";

function getRandomInt(min: number,max: number): number {  // inluding max and min val
return min + Math.floor(Math.random() * (max - min + 1));
}
/* 
walls -
    first index x (first demention) - showing u is it horisontal or vertical wall 
    0 - horisontal, 1 - vertical, 2 - horisontal, 3 - vertical ...
    second index y (second demention) - showing the possition of wall
    0 - first column, 1 - second column, 2 - third column ...
    
    ((
        Its made just for make it harder for user to tech him how 
        to program in memry bound enviroment 
    ))
walls[x][y]
         0 1 2 3 4 5
        0 1 2 3 4 5
    ----------------> y
   |    
 0 |     - - - - - - -
 1 |    | | | | | | |
 2 |     - - - - - - -
 3 |    | | | | | | |
x \/     - - - - - - -
*/
class Maze extends Executable {
    walls: Array<boolean[]>; // 0 - empty, 1 - walls
    player: [number, number];
    size: [number, number];
    constructor(size: [number, number], path_length: number) {
        super(true);
        this.setMethods(["move", "get_walls"]);

        let generated_spots: number[][] = Array.from(
            { length: size[0] },
            () => new Array(size[1]).fill(0)
        ); // false -not-generated true- generated\
        this.size = size
        this.player = [getRandomInt(0,size[0] - 1), getRandomInt(0,size[1] - 1)];
        this.walls = Array.from({ length: size[0] * 2 + 1 }, (_, i) =>
            (i % 2 === 0
                ? new Array(size[1]).fill(true)
                : new Array(size[1] + 1).fill(true))
            );

        generated_spots[this.player[0]][this.player[1]] = 1;

        // Generating main Path
        let previus: [number, number] = [...this.player];
        let countinue = true
        for (let step = 2; countinue; step++){
            let next_move: [number, number] = [0, 0];
            let possible_next_moves = this.get_possible_moves(previus, generated_spots)

            while(!possible_next_moves.length && !this.is_it_near_border(previus)){

                generated_spots[previus[0]][previus[1]] = -1;
                let boxes_near = this.get_near_boxes(previus);
                for(let el of boxes_near) {
                    if(generated_spots[el[0]][el[1]] === step - 2){
                        possible_next_moves = this.get_possible_moves(el, generated_spots);
                        previus = el;
                        step--;
                        break;
                    }
                }
            }
            
            if (step < path_length + 1 && possible_next_moves.length){
                let steps_not_next_to_border = possible_next_moves.filter(el => 
                    Math.min(el[0], el[1]) >= 1 && el[0] < size[0] - 1 && el[1] < size[1] - 1
                )

                next_move = steps_not_next_to_border.length === 0 ? 
                    possible_next_moves[getRandomInt(0, possible_next_moves.length - 1)] :
                    steps_not_next_to_border[getRandomInt(0, steps_not_next_to_border.length - 1)]

            } else if (this.is_it_near_border(previus)) {
                if (previus[0] == 0 || previus[0] == size[0] - 1) {
                    next_move = previus[0] == 0? [- 1, previus[1]] : [previus[0] + 1, previus[1]] 
                }else if (previus[1] == 0 || previus[1] == size[1] - 1) {
                    next_move = previus[1] == 0? [previus[0], -1] : [previus[0], previus[1] + 1] 
                }
                countinue = false;
            } else {
                let distances: number[] = possible_next_moves.map(el => Math.min(size[0] - el[0], el[0] + 1, size[1] - el[1], el[1] + 1))
                let smallest_distance: [number, number] = [0, distances[0]] // index, dist
                for (let i = 0; i < distances.length; i++) {
                    if (smallest_distance[1] > distances[i]) {
                        smallest_distance = [i, distances[i]]
                    }
                }
                next_move = possible_next_moves[smallest_distance[0]]
            }

            this.set_wall(next_move, previus, false)
            countinue && (previus = [...next_move])
            countinue && (generated_spots[previus[0]][previus[1]] = step);
        }

        // Generating random paths
        let possible_starts: [number, number][] = []
        while (true) {
            possible_starts = generated_spots.reduce((acc, row, rowIndex): [number, number][] => {
                row.forEach((value, colIndex) => {
                    if (value !== 0 && this.get_possible_moves([rowIndex, colIndex], generated_spots).length) {
                        acc.push([rowIndex, colIndex]);
                    }
                });
                return acc;
            }, [] as [number, number][]);

            if(possible_starts.length === 0) {
                break;
            }
            
            previus = possible_starts[getRandomInt(0, possible_starts.length - 1)]
            while (true) {
                let possible_moves = this.get_possible_moves(previus, generated_spots)
                if(!possible_moves.length){
                    break;
                }
                let next_move = possible_moves[getRandomInt(0, possible_moves.length - 1)]
                generated_spots[next_move[0]][next_move[1]] = -1;

                this.set_wall(next_move, previus, false)
                if(Math.random() < 0.1){
                    break;
                }
                previus = next_move
            }
        } 

        for(let el of generated_spots) {
            console.log("el of generated_spots", el)
        }

        console.log(possible_starts)
    }

    isDone(): boolean {
        return Math.min(...this.player) < 0 || this.player[0] > this.size[0] - 1 || this.player[1] > this.size[1] - 1
    }

    set_wall(possition: [number, number], join_with: [number, number], set_on: boolean = false){
        let wall: [number, number] = this.find_wall_possition_between(possition, join_with)

        this.walls[wall[0]][wall[1]] = set_on;
    }

    find_wall_possition_between(possition: [number, number], join_with: [number, number]): [number, number] {
        let wall: [number, number] = [2 * (join_with[0] + 1) - 1, Math.max(possition[1], join_with[1])];
        
        if(possition[0] !== join_with[0]){
            wall[0] += possition[0] < join_with[0]? -1 : 1;    
        } 

        return wall
    }

    get_possible_moves(possition: [number, number], generated_spots: Array<number[]>) {
        let possible_moves: Array<[number, number]> = this.get_near_boxes(possition)

        return possible_moves.filter(el => 
            generated_spots[el[0]][el[1]] === 0
        )
    }

    get_near_boxes(possition: [number, number]) : Array<[number, number]> {
        let possible_moves: Array<[number, number]> = [
            [possition[0] + 1,possition[1]], [possition[0] - 1,possition[1]],
            [possition[0], possition[1] + 1], [possition[0],possition[1] - 1]
        ]
        return possible_moves.filter((el: [number, number]) =>
            Math.min(...el) >= 0 && el[0] < this.size[0] && el[1] < this.size[1]
        )
    }

    is_it_near_border(possition: [number, number]) {
        return possition[0] == 0 || possition[1] == 0 || possition[0] == this.size[0] - 1 || possition[1] == this.size[0] - 1
    }

    // Methods for player (Executable)
    move(dir: Dir) {
        let next_move: [number, number] = [0, 0];
        switch (dir) {
            case Dir.Up:
                next_move = [this.player[0] + 1, this.player[1]];
                break;
            case Dir.Down:
                next_move = [this.player[0] - 1, this.player[1]];
                break;
            case Dir.Left:
                next_move = [this.player[0], this.player[1] - 1];
                break;
            case Dir.Right:
                next_move = [this.player[0], this.player[1] + 1];
                break;

            default:
                throw new Error("No such dir as " + dir);
        }

        let wall_possition = this.find_wall_possition_between(this.player, next_move)
        if (this.walls[wall_possition[0]][wall_possition[1]]) {
            throw new Error("Can't move there")
        }

        this.player = next_move
    }

    get_walls() {
        return this.walls
    }
}

// new Maze([10,10], 50)

export default Maze;