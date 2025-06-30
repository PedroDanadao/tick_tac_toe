const AllEqual = (function() {
    /**
     * Module that checks if the passed array has equal items in it's entirety
     * 
     * @param passed_array Array that will be checked
     * @returns function
     */
    function equal_items(passed_array: Array<string>) {
        let previous_item: string = passed_array[0];

        for (let item of passed_array) {
            if (item != previous_item) return false;
        }

        return true
    }

    function contains(passed_array: Array<string>, passed_string: string) {
        return passed_array[0] === passed_string;
    }

    function all_equal(passed_array: Array<string>, passed_string: string) {
        return contains(passed_array, passed_string) && equal_items(passed_array);
    }

    return {all_equal};
})();


const PlayerDisplay = (function() {
    /**
     * Module that is responsible to change the current player display
     */
    const player_div = document.querySelector(".current_player") as HTMLDivElement;

    function change_player(player_number: number) {
        if (player_number === 1) {
            player_div.textContent = "Current Player: Player 1 (X)";
        }
        else if (player_number === 2) {
            player_div.textContent = "Current Player: Player 2 (O)";
        }
    }

    return {change_player};
})();


function CreateMarkSpace() {
    let mark_string = '-';
    let div_element = null as HTMLDivElement;

    function get_mark_string() {
        return mark_string;
    }

    function mark_x() {
        mark_string = 'x';

        if (div_element !== null) div_element.innerText = "X";
    }
    
    function mark_o() {
        mark_string = 'o';
        if (div_element !== null) div_element.innerText = "O";
    }
    
    function mark_from_string(x_or_o) {
        
        if (x_or_o === 'x') mark_x();
        
        else if (x_or_o === 'o') mark_o();
    }
    
    function reset_mark() {
        mark_string = '-';
        if (div_element !== null) div_element.innerText = "";
    }

    function is_marked() {
        return (mark_string === 'x') || (mark_string === 'o');
    }

    function set_div_element(passed_div_element: HTMLDivElement) {
        div_element = passed_div_element;
    }

    return {
        get_mark_string,
        mark_x,
        mark_o,
        mark_from_string,
        reset_mark,
        is_marked,
        set_div_element
    }
}


function CreateLine(mark_1: typeof CreateMarkSpace, mark_2: typeof CreateMarkSpace, mark_3: typeof CreateMarkSpace) {
    const line_array = [mark_1, mark_2, mark_3];

    function mark(x_or_o: string, array_position: number) {
        const mark_object = line_array[array_position];

        if ( mark_object.is_marked() ) {
            console.log(`position already marked with ${mark_object.get_mark_string()}`)
            return false;
        }

        mark_object.mark_from_string(x_or_o);

        return true;
    }

    function mark_x(array_position: number) {
        return mark('x', array_position);
    }

    function mark_o(array_position: number) {
        return mark('o', array_position);
    }

    function get_array_strings() {
        return [mark_1.get_mark_string(), mark_2.get_mark_string(), mark_3.get_mark_string()]
    }

    function check_line_win() {
        const array_strings = get_array_strings();

        if ( AllEqual.all_equal(array_strings, 'x') ) return 1

        if ( AllEqual.all_equal(array_strings, 'o') ) return 2
        
        return 0
    }

    function check_all_marked() {
        return mark_1.is_marked() && mark_2.is_marked() && mark_3.is_marked();
    }

    function print_line() {
        console.log(get_array_strings().join(" "));
    }

    function reset_line() {
        for (let mark_obj of line_array) {
            mark_obj.reset_mark();
        }
    }

    function set_div_element(i: number, div_element: HTMLDivElement) {
        line_array[i].set_div_element(div_element);
    }

    return {
        mark_x,
        mark_o,
        check_line_win,
        print_line,
        reset_line,
        set_div_element,
        check_all_marked
    };
}


function CreateBoard() {
    let current_player = 1;
    set_current_player(1);
    let match_status = "on going";

    const reset_match_button = document.querySelector(".reset_match_button") as HTMLButtonElement;
    reset_match_button.addEventListener("click", reset_or_restart_match);

    const [mark_1, mark_2, mark_3] = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()]
    const [mark_4, mark_5, mark_6] = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()]
    const [mark_7, mark_8, mark_9] = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()]
    
    const row_1 = CreateLine(mark_1, mark_2, mark_3);
    const row_2 = CreateLine(mark_4, mark_5, mark_6);
    const row_3 = CreateLine(mark_7, mark_8, mark_9);
    
    const column_1 = CreateLine(mark_1, mark_4, mark_7);
    const column_2 = CreateLine(mark_2, mark_5, mark_8);
    const column_3 = CreateLine(mark_3, mark_6, mark_9);
    
    const diagonal_1 = CreateLine(mark_1, mark_5, mark_9);
    const diagonal_2 = CreateLine(mark_7, mark_5, mark_3);
    
    const all_lines = [
        row_1, row_2, row_3,
        column_1, column_2, column_3,
        diagonal_1, diagonal_2
    ];
    
    const board = [
        row_1,
        row_2,
        row_3
    ];
    
    // Link the div elements to the created mark objects
    for (let i=0; i < 3; i++){
        for (let j=0; j < 3; j++){
            let mark_space_div = document.querySelector(`.row_${i}_${j}`) as HTMLDivElement;
            board[i].set_div_element(j, mark_space_div);

            mark_space_div.addEventListener("click", mark_space_clicked)
        }
    }

    function mark_space_clicked(event: MouseEvent) {
        /**
         * Mark a space when the associated div is clicked
         */
        const space_div_element = event.target as HTMLDivElement;
        const div_class_name = space_div_element.className;

        const string_list = div_class_name.split('_');
        const [i, j] = [Number(string_list[2]), Number(string_list[3])];

        mark_space(i, j);
    }

    function mark_space(i: number, j: number) {
        if (match_status === "finished") return;

        if (current_player === 1) {
            const was_marked = mark_x(i, j);
            if (was_marked) set_current_player(2);
        }
        else {
            const was_marked = mark_o(i, j);
            if (was_marked) set_current_player(1);
        }

        // check if a win or a draw was achieved. If not, then the game continues
        const result = check_win();
        const draw = check_draw();
        if ((!result) && (!draw))  return;

        // if a win was achieved, then change the text in the reset_match_button to Play Again
        reset_match_button.textContent = "Play Again";
        // also change the match status to finished
        match_status = "finished";
    }

    function restart_game() {
        reset_board();
        set_current_player(1);
    }

    function mark_x(i: number, j: number) {
        return board[i].mark_x(j);
    }

    function mark_o(i: number, j: number) {
        return board[i].mark_o(j);
    }

    function print_board() {
        row_1.print_line();
        row_2.print_line();
        row_3.print_line();
    }

    function check_win() {
        let result_number = 0;

        for (let line of all_lines) {
            result_number = line.check_line_win();

            if (result_number) break;
        }

        if (result_number === 1) console.log("Congratulations! X Won!")
        
        else if (result_number === 2) console.log("Congratulations! O Won!")
        
        else console.log("Game not finished yet");

        return result_number;
    }

    function check_draw() {
        return row_1.check_all_marked() && row_2.check_all_marked() && row_3.check_all_marked();
    }

    function reset_board() {
        for (let line_obj of board) {
            line_obj.reset_line();
        }
    }

    function set_current_player(player_number: number) {
        current_player = player_number;
        PlayerDisplay.change_player(player_number);
    }

    function reset_or_restart_match() {
        reset_match_button.textContent = "Reset Match";

        restart_game();
        match_status = "on going";
    }

    return {
        mark_space,
        print_board,
        check_win
    }
}


const board = CreateBoard();

// board.mark_space(1, 1);
// board.mark_space(0, 1);
// board.mark_space(0, 0);
// board.mark_space(0, 2);
// board.mark_space(0, 2);
// board.mark_space(2, 2);
