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

    let current_player = 1;

    const player_1_input = document.querySelector(".pni_1") as HTMLInputElement;
    const player_2_input = document.querySelector(".pni_2") as HTMLInputElement;

    player_1_input.addEventListener("change", update_current_player_div)

    function change_player(player_number: number) {
        current_player = player_number;
        update_current_player_div();
    }

    function update_current_player_div() {
        let input_to_use = player_1_input;
        let mark_to_use = 'X'
        
        if (current_player == 2) {
            input_to_use = player_2_input;
            mark_to_use = 'O';
        }

        const input_value = input_to_use.value;

        let player_name = `Player ${current_player}`;
        if (input_value) player_name = input_value;
        
        player_div.textContent = `Current Player: ${player_name} (${mark_to_use})`;
    }

    return {change_player};
})();


const ChangeGameBoard = (function() {
    const game_board_element = document.querySelector(".board_container") as HTMLDivElement;
    const background_image_element = document.querySelector(".background_image") as HTMLImageElement;
    const central_line_element = document.querySelector(".win_line") as HTMLImageElement;
    const win_side_line_element = document.querySelector(".win_side_line") as HTMLImageElement;
    const body_element = document.querySelector("body") as HTMLBodyElement;
    const photo_link_container = document.querySelector(".photo_link_container") as HTMLDivElement;
    const photo_link = document.querySelector(".photo_link") as HTMLDivElement;
    const photographer_link = document.querySelector(".photographer_link") as HTMLDivElement;

    function toggle_game_board() {
        const current_board = game_board_element.className;

        let new_image = '';
        let new_background_image = '';
        let new_class_name = '';
        let new_central_line_image = '';
        let new_side_line_image = '';

        let new_font = '';
        let new_font_color = '';

        let new_photo_link_container_class = '';
        let new_photo_link_href = '';
        let new_photographer_link_href = '';
        let new_photographer_name = '';

        if (current_board == "board_container crayon_style") {
            new_image = "images/game_lines_pencil.png";
            new_class_name = "board_container pen_style";
            new_background_image = "./images/notebook_page.jpg";
            new_central_line_image = "./images/pen_win_line.png"
            new_side_line_image = "./images/pen_win_side_line.png"
            new_font = "Indie Flower";
            new_font_color = "blue"

            MatchesTable.change_style("pen");

            new_photo_link_container_class = 'photo_link_container pen_link';
            new_photo_link_href = "https://www.pexels.com/photo/blank-sheet-of-notebook-with-lines-18368498/";
            new_photographer_link_href = "https://www.pexels.com/@heather-green-1125370/";
            new_photographer_name = "Heather Green";
        }
        else {
            new_image = "images/game_lines_crayon.png";
            new_class_name = "board_container crayon_style";
            new_background_image = "./images/black_board.jpg";
            new_central_line_image = "./images/crayon_win_line.png"
            new_side_line_image = "./images/crayon_win_side_line.png"
            new_font = "Cabin Sketch";
            new_font_color = "white"
            
            MatchesTable.change_style("crayon");
            
            new_photo_link_container_class = 'photo_link_container crayon_link';
            new_photo_link_href = "https://www.pexels.com/photo/white-chalks-2675047/";
            new_photographer_link_href = "https://www.pexels.com/@didsss/";
            new_photographer_name = "Diana ✨";
        }

        game_board_element.style.backgroundImage = `url('${new_image}')`;
        game_board_element.className = new_class_name;
        background_image_element.setAttribute("src", new_background_image);
        central_line_element.setAttribute("src", new_central_line_image);
        win_side_line_element.setAttribute("src", new_side_line_image);

        body_element.style.fontFamily = new_font;
        body_element.style.color = new_font_color;

        photo_link_container.className = new_photo_link_container_class;
        photo_link.setAttribute("href", new_photo_link_href);
        photographer_link.setAttribute("href", new_photographer_link_href);
        photographer_link.textContent = new_photographer_name;
    }

    return {toggle_game_board};
})();


const MatchesTable = (function() {
    const table_element = document.querySelector("table") as HTMLTableElement;
    const table_body_element = document.querySelector("tbody") as HTMLTableSectionElement;

    const player_1_count_bold = document.querySelector(".player_1_win_count>b") as HTMLDivElement;
    const player_2_count_bold = document.querySelector(".player_2_win_count>b") as HTMLDivElement;
    const draw_count_bold = document.querySelector(".draws_count>b") as HTMLDivElement;

    function toggle_matches_table() {
        if (table_element.style.visibility === "visible") {
            table_element.style.visibility = "hidden";
        }
        else {
            table_element.style.visibility = "visible";
        }
    }

    function change_style(style_string: string) {
        if (style_string === "crayon") {
            table_element.className = "crayon_table";
        }
        else {
            table_element.className = "pen_table";
        }
    }

    function add_win(winner: string) {
        const new_row = table_body_element.insertRow() as HTMLTableRowElement;
        
        const number_of_rows = table_body_element.rows.length;
        const match_number_cell = new_row.insertCell(0);
        match_number_cell.textContent = `${number_of_rows}`;

        const winner_cell = new_row.insertCell(1);
        winner_cell.textContent = winner;
        if (winner === "X"){
            winner_cell.className = "td_x";
            player_1_count_bold.textContent = String(Number(player_1_count_bold.textContent) + 1);
        }
        else if (winner === "Draw"){
            winner_cell.className = "td_draw";
            draw_count_bold.textContent = String(Number(draw_count_bold.textContent) + 1);

        }
        else {
            player_2_count_bold.textContent = String(Number(player_2_count_bold.textContent) + 1);
        }
    }

    return {toggle_matches_table, change_style, add_win};
})();


function CreateMarkSpace() {
    let mark_string = '-';
    let div_element = null as HTMLDivElement;

    function get_mark_string() {
        return mark_string;
    }

    function mark_x() {
        mark_string = 'x';

        if (div_element !== null) {
            div_element.innerText = "X";
            div_element.setAttribute("name", 'x')
        }
    }
    
    function mark_o() {
        mark_string = 'o';
        if (div_element !== null) {
            div_element.innerText = "O";
            div_element.setAttribute("name", 'o')
        }
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


const HoverColor = (function() {
    const board_container = document.querySelector(".board_container") as HTMLDivElement;

    function change_hover_color(color_index: number) {
        if (color_index === 1) board_container.setAttribute("data-", "red");

        else board_container.setAttribute("data-", "blue");
    }

    return {change_hover_color};
})();


function CreateLine(mark_1: typeof CreateMarkSpace, mark_2: typeof CreateMarkSpace, mark_3: typeof CreateMarkSpace,
                    win_line_to_use: HTMLImageElement, degree_to_turn: number) {
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

    function set_win_line(line_element: HTMLImageElement) {
        win_line_to_use = line_element;
    }

    function set_line_rotation(rotation_value: number) {
        degree_to_turn = rotation_value;
    }

    function show_and_rotate_line() {
        // win_line_to_use.setAttribute("rotate", `${degree_to_turn}deg`);
        // win_line_to_use.setAttribute("visibility", "visible");

        win_line_to_use.style.visibility = "visible";
        win_line_to_use.style.rotate = `${degree_to_turn}deg`;
    }

    return {
        mark_x,
        mark_o,
        check_line_win,
        print_line,
        reset_line,
        set_div_element,
        check_all_marked,
        set_win_line,
        set_line_rotation,
        show_and_rotate_line
    };
}


function CreateBoard() {
    let current_player = 1;
    set_current_player(1);
    let match_status = "on going";

    const score_array = [] as Array<string>;

    const reset_match_button = document.querySelector(".reset_match_button") as HTMLButtonElement;
    reset_match_button.addEventListener("click", reset_or_restart_match);

    const toggle_game_board_button = document.querySelector(".toggle_game_board_button") as HTMLButtonElement;
    toggle_game_board_button.addEventListener("click", ChangeGameBoard.toggle_game_board);

    const central_win_line = document.querySelector(".win_line") as HTMLImageElement;
    const win_side_line = document.querySelector(".win_side_line") as HTMLImageElement;

    const toggle_matches_table_button = document.querySelector(".toggle_matches_table_button") as HTMLButtonElement;
    toggle_matches_table_button.addEventListener("click", MatchesTable.toggle_matches_table);

    const [mark_1, mark_2, mark_3] = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()]
    const [mark_4, mark_5, mark_6] = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()]
    const [mark_7, mark_8, mark_9] = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()]
    
    const row_1 = CreateLine(mark_1, mark_2, mark_3, win_side_line, 90);
    const row_2 = CreateLine(mark_4, mark_5, mark_6, central_win_line, 90);
    const row_3 = CreateLine(mark_7, mark_8, mark_9, win_side_line, 270);
    
    const column_1 = CreateLine(mark_1, mark_4, mark_7, win_side_line, 0);
    const column_2 = CreateLine(mark_2, mark_5, mark_8, central_win_line, 0);
    const column_3 = CreateLine(mark_3, mark_6, mark_9, win_side_line, 180);
    
    const diagonal_1 = CreateLine(mark_1, mark_5, mark_9, central_win_line, 135);
    const diagonal_2 = CreateLine(mark_7, mark_5, mark_3, central_win_line, 45);
    
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
        
        // needed to do this to avoid a draw being pushed to the score when a player wins and all spaces are marked
        let draw = false;
        if (!result) draw = check_draw();
        
        if ((!result) && (!draw))  return;

        // if a win or a draw was achieved, then change the text in the reset_match_button to Play Again
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

            if (result_number) {
                line.show_and_rotate_line();
                break
            };
        }

        if (result_number === 1) {
            console.log("Congratulations! X Won!");
            score_array.push("x");
            MatchesTable.add_win("X");
        }
        
        else if (result_number === 2) {
            console.log("Congratulations! O Won!");
            score_array.push("o");
            MatchesTable.add_win("O");
        }
        
        else console.log("Game not finished yet");

        return result_number;
    }

    function check_draw() {
        const game_draw = row_1.check_all_marked() && row_2.check_all_marked() && row_3.check_all_marked();

        if (game_draw){
            score_array.push('d');
            MatchesTable.add_win("Draw");
        }
        return game_draw;
    }

    function reset_board() {
        for (let line_obj of board) {
            line_obj.reset_line();
        }

        win_side_line.style.visibility = "hidden";
        central_win_line.style.visibility = "hidden";
    }

    function set_current_player(player_number: number) {
        current_player = player_number;
        PlayerDisplay.change_player(player_number);

        HoverColor.change_hover_color(player_number);
    }

    function reset_or_restart_match() {
        reset_match_button.textContent = "Reset Match";

        restart_game();
        match_status = "on going";
    }

    function print_score_array() {
        console.table(score_array);
    }

    return {
        mark_space,
        print_board,
        check_win,
        print_score_array
    }
}


const board = CreateBoard();

// board.mark_space(1, 1);
// board.mark_space(0, 1);
// board.mark_space(0, 0);
// board.mark_space(0, 2);
// board.mark_space(0, 2);
// board.mark_space(2, 2);
