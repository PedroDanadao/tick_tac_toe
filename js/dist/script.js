var AllEqual = (function () {
    /**
     * Module that checks if the passed array has equal items in it's entirety
     *
     * @param passed_array Array that will be checked
     * @returns function
     */
    function equal_items(passed_array) {
        var previous_item = passed_array[0];
        for (var _i = 0, passed_array_1 = passed_array; _i < passed_array_1.length; _i++) {
            var item = passed_array_1[_i];
            if (item != previous_item)
                return false;
        }
        return true;
    }
    function contains(passed_array, passed_string) {
        return passed_array[0] === passed_string;
    }
    function all_equal(passed_array, passed_string) {
        return contains(passed_array, passed_string) && equal_items(passed_array);
    }
    return { all_equal: all_equal };
})();
var PlayerDisplay = (function () {
    /**
     * Module that is responsible to change the current player display
     */
    var player_div = document.querySelector(".current_player");
    var current_player = 1;
    var player_1_input = document.querySelector(".pni_1");
    var player_2_input = document.querySelector(".pni_2");
    player_1_input.addEventListener("change", update_current_player_div);
    function change_player(player_number) {
        current_player = player_number;
        update_current_player_div();
    }
    function update_current_player_div() {
        var input_to_use = player_1_input;
        var mark_to_use = 'X';
        if (current_player == 2) {
            input_to_use = player_2_input;
            mark_to_use = 'O';
        }
        var input_value = input_to_use.value;
        var player_name = "Player " + current_player;
        if (input_value)
            player_name = input_value;
        player_div.textContent = "Current Player: " + player_name + " (" + mark_to_use + ")";
    }
    return { change_player: change_player };
})();
var ChangeGameBoard = (function () {
    var game_board_element = document.querySelector(".board_container");
    var background_image_element = document.querySelector(".background_image");
    var central_line_element = document.querySelector(".win_line");
    var win_side_line_element = document.querySelector(".win_side_line");
    var body_element = document.querySelector("body");
    var photo_link_container = document.querySelector(".photo_link_container");
    var photo_link = document.querySelector(".photo_link");
    var photographer_link = document.querySelector(".photographer_link");
    function toggle_game_board() {
        var current_board = game_board_element.className;
        var new_image = '';
        var new_background_image = '';
        var new_class_name = '';
        var new_central_line_image = '';
        var new_side_line_image = '';
        var new_font = '';
        var new_font_color = '';
        var new_photo_link_container_class = '';
        var new_photo_link_href = '';
        var new_photographer_link_href = '';
        var new_photographer_name = '';
        if (current_board == "board_container crayon_style") {
            new_image = "images/game_lines_pencil.png";
            new_class_name = "board_container pen_style";
            new_background_image = "./images/notebook_page.jpg";
            new_central_line_image = "./images/pen_win_line.png";
            new_side_line_image = "./images/pen_win_side_line.png";
            new_font = "Indie Flower";
            new_font_color = "blue";
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
            new_central_line_image = "./images/crayon_win_line.png";
            new_side_line_image = "./images/crayon_win_side_line.png";
            new_font = "Cabin Sketch";
            new_font_color = "white";
            MatchesTable.change_style("crayon");
            new_photo_link_container_class = 'photo_link_container crayon_link';
            new_photo_link_href = "https://www.pexels.com/photo/white-chalks-2675047/";
            new_photographer_link_href = "https://www.pexels.com/@didsss/";
            new_photographer_name = "Diana ✨";
        }
        game_board_element.style.backgroundImage = "url('" + new_image + "')";
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
    return { toggle_game_board: toggle_game_board };
})();
var MatchesTable = (function () {
    var table_element = document.querySelector("table");
    var table_body_element = document.querySelector("tbody");
    var player_1_count_bold = document.querySelector(".player_1_win_count>b");
    var player_2_count_bold = document.querySelector(".player_2_win_count>b");
    var draw_count_bold = document.querySelector(".draws_count>b");
    function toggle_matches_table() {
        if (table_element.style.visibility === "visible") {
            table_element.style.visibility = "hidden";
        }
        else {
            table_element.style.visibility = "visible";
        }
    }
    function change_style(style_string) {
        if (style_string === "crayon") {
            table_element.className = "crayon_table";
        }
        else {
            table_element.className = "pen_table";
        }
    }
    function add_win(winner) {
        var new_row = table_body_element.insertRow();
        var number_of_rows = table_body_element.rows.length;
        var match_number_cell = new_row.insertCell(0);
        match_number_cell.textContent = "" + number_of_rows;
        var winner_cell = new_row.insertCell(1);
        winner_cell.textContent = winner;
        if (winner === "X") {
            winner_cell.className = "td_x";
            player_1_count_bold.textContent = String(Number(player_1_count_bold.textContent) + 1);
        }
        else if (winner === "Draw") {
            winner_cell.className = "td_draw";
            draw_count_bold.textContent = String(Number(draw_count_bold.textContent) + 1);
        }
        else {
            player_2_count_bold.textContent = String(Number(player_2_count_bold.textContent) + 1);
        }
    }
    return { toggle_matches_table: toggle_matches_table, change_style: change_style, add_win: add_win };
})();
function CreateMarkSpace() {
    var mark_string = '-';
    var div_element = null;
    function get_mark_string() {
        return mark_string;
    }
    function mark_x() {
        mark_string = 'x';
        if (div_element !== null) {
            div_element.innerText = "X";
            div_element.setAttribute("name", 'x');
        }
    }
    function mark_o() {
        mark_string = 'o';
        if (div_element !== null) {
            div_element.innerText = "O";
            div_element.setAttribute("name", 'o');
        }
    }
    function mark_from_string(x_or_o) {
        if (x_or_o === 'x')
            mark_x();
        else if (x_or_o === 'o')
            mark_o();
    }
    function reset_mark() {
        mark_string = '-';
        if (div_element !== null)
            div_element.innerText = "";
    }
    function is_marked() {
        return (mark_string === 'x') || (mark_string === 'o');
    }
    function set_div_element(passed_div_element) {
        div_element = passed_div_element;
    }
    return {
        get_mark_string: get_mark_string,
        mark_x: mark_x,
        mark_o: mark_o,
        mark_from_string: mark_from_string,
        reset_mark: reset_mark,
        is_marked: is_marked,
        set_div_element: set_div_element
    };
}
var HoverColor = (function () {
    var board_container = document.querySelector(".board_container");
    function change_hover_color(color_index) {
        if (color_index === 1)
            board_container.setAttribute("data-", "red");
        else
            board_container.setAttribute("data-", "blue");
    }
    return { change_hover_color: change_hover_color };
})();
function CreateLine(mark_1, mark_2, mark_3, win_line_to_use, degree_to_turn) {
    var line_array = [mark_1, mark_2, mark_3];
    function mark(x_or_o, array_position) {
        var mark_object = line_array[array_position];
        if (mark_object.is_marked()) {
            console.log("position already marked with " + mark_object.get_mark_string());
            return false;
        }
        mark_object.mark_from_string(x_or_o);
        return true;
    }
    function mark_x(array_position) {
        return mark('x', array_position);
    }
    function mark_o(array_position) {
        return mark('o', array_position);
    }
    function get_array_strings() {
        return [mark_1.get_mark_string(), mark_2.get_mark_string(), mark_3.get_mark_string()];
    }
    function check_line_win() {
        var array_strings = get_array_strings();
        if (AllEqual.all_equal(array_strings, 'x'))
            return 1;
        if (AllEqual.all_equal(array_strings, 'o'))
            return 2;
        return 0;
    }
    function check_all_marked() {
        return mark_1.is_marked() && mark_2.is_marked() && mark_3.is_marked();
    }
    function print_line() {
        console.log(get_array_strings().join(" "));
    }
    function reset_line() {
        for (var _i = 0, line_array_1 = line_array; _i < line_array_1.length; _i++) {
            var mark_obj = line_array_1[_i];
            mark_obj.reset_mark();
        }
    }
    function set_div_element(i, div_element) {
        line_array[i].set_div_element(div_element);
    }
    function set_win_line(line_element) {
        win_line_to_use = line_element;
    }
    function set_line_rotation(rotation_value) {
        degree_to_turn = rotation_value;
    }
    function show_and_rotate_line() {
        // win_line_to_use.setAttribute("rotate", `${degree_to_turn}deg`);
        // win_line_to_use.setAttribute("visibility", "visible");
        win_line_to_use.style.visibility = "visible";
        win_line_to_use.style.rotate = degree_to_turn + "deg";
    }
    return {
        mark_x: mark_x,
        mark_o: mark_o,
        check_line_win: check_line_win,
        print_line: print_line,
        reset_line: reset_line,
        set_div_element: set_div_element,
        check_all_marked: check_all_marked,
        set_win_line: set_win_line,
        set_line_rotation: set_line_rotation,
        show_and_rotate_line: show_and_rotate_line
    };
}
function CreateBoard() {
    var current_player = 1;
    set_current_player(1);
    var match_status = "on going";
    var score_array = [];
    var reset_match_button = document.querySelector(".reset_match_button");
    reset_match_button.addEventListener("click", reset_or_restart_match);
    var toggle_game_board_button = document.querySelector(".toggle_game_board_button");
    toggle_game_board_button.addEventListener("click", ChangeGameBoard.toggle_game_board);
    var central_win_line = document.querySelector(".win_line");
    var win_side_line = document.querySelector(".win_side_line");
    var toggle_matches_table_button = document.querySelector(".toggle_matches_table_button");
    toggle_matches_table_button.addEventListener("click", MatchesTable.toggle_matches_table);
    var _a = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()], mark_1 = _a[0], mark_2 = _a[1], mark_3 = _a[2];
    var _b = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()], mark_4 = _b[0], mark_5 = _b[1], mark_6 = _b[2];
    var _c = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()], mark_7 = _c[0], mark_8 = _c[1], mark_9 = _c[2];
    var row_1 = CreateLine(mark_1, mark_2, mark_3, win_side_line, 90);
    var row_2 = CreateLine(mark_4, mark_5, mark_6, central_win_line, 90);
    var row_3 = CreateLine(mark_7, mark_8, mark_9, win_side_line, 270);
    var column_1 = CreateLine(mark_1, mark_4, mark_7, win_side_line, 0);
    var column_2 = CreateLine(mark_2, mark_5, mark_8, central_win_line, 0);
    var column_3 = CreateLine(mark_3, mark_6, mark_9, win_side_line, 180);
    var diagonal_1 = CreateLine(mark_1, mark_5, mark_9, central_win_line, 135);
    var diagonal_2 = CreateLine(mark_7, mark_5, mark_3, central_win_line, 45);
    var all_lines = [
        row_1, row_2, row_3,
        column_1, column_2, column_3,
        diagonal_1, diagonal_2
    ];
    var board = [
        row_1,
        row_2,
        row_3
    ];
    // Link the div elements to the created mark objects
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var mark_space_div = document.querySelector(".row_" + i + "_" + j);
            board[i].set_div_element(j, mark_space_div);
            mark_space_div.addEventListener("click", mark_space_clicked);
        }
    }
    function mark_space_clicked(event) {
        /**
         * Mark a space when the associated div is clicked
         */
        var space_div_element = event.target;
        var div_class_name = space_div_element.className;
        var string_list = div_class_name.split('_');
        var _a = [Number(string_list[2]), Number(string_list[3])], i = _a[0], j = _a[1];
        mark_space(i, j);
    }
    function mark_space(i, j) {
        if (match_status === "finished")
            return;
        if (current_player === 1) {
            var was_marked = mark_x(i, j);
            if (was_marked)
                set_current_player(2);
        }
        else {
            var was_marked = mark_o(i, j);
            if (was_marked)
                set_current_player(1);
        }
        // check if a win or a draw was achieved. If not, then the game continues
        var result = check_win();
        // needed to do this to avoid a draw being pushed to the score when a player wins and all spaces are marked
        var draw = false;
        if (!result)
            draw = check_draw();
        if ((!result) && (!draw))
            return;
        // if a win or a draw was achieved, then change the text in the reset_match_button to Play Again
        reset_match_button.textContent = "Play Again";
        // also change the match status to finished
        match_status = "finished";
    }
    function restart_game() {
        reset_board();
        set_current_player(1);
    }
    function mark_x(i, j) {
        return board[i].mark_x(j);
    }
    function mark_o(i, j) {
        return board[i].mark_o(j);
    }
    function print_board() {
        row_1.print_line();
        row_2.print_line();
        row_3.print_line();
    }
    function check_win() {
        var result_number = 0;
        for (var _i = 0, all_lines_1 = all_lines; _i < all_lines_1.length; _i++) {
            var line = all_lines_1[_i];
            result_number = line.check_line_win();
            if (result_number) {
                line.show_and_rotate_line();
                break;
            }
            ;
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
        else
            console.log("Game not finished yet");
        return result_number;
    }
    function check_draw() {
        var game_draw = row_1.check_all_marked() && row_2.check_all_marked() && row_3.check_all_marked();
        if (game_draw) {
            score_array.push('d');
            MatchesTable.add_win("Draw");
        }
        return game_draw;
    }
    function reset_board() {
        for (var _i = 0, board_1 = board; _i < board_1.length; _i++) {
            var line_obj = board_1[_i];
            line_obj.reset_line();
        }
        win_side_line.style.visibility = "hidden";
        central_win_line.style.visibility = "hidden";
    }
    function set_current_player(player_number) {
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
        mark_space: mark_space,
        print_board: print_board,
        check_win: check_win,
        print_score_array: print_score_array
    };
}
var board = CreateBoard();
// board.mark_space(1, 1);
// board.mark_space(0, 1);
// board.mark_space(0, 0);
// board.mark_space(0, 2);
// board.mark_space(0, 2);
// board.mark_space(2, 2);
