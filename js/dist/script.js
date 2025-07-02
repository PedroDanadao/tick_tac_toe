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
    function change_player(player_number) {
        if (player_number === 1) {
            player_div.textContent = "Current Player: Player 1 (X)";
        }
        else if (player_number === 2) {
            player_div.textContent = "Current Player: Player 2 (O)";
        }
    }
    return { change_player: change_player };
})();
function CreateMarkSpace() {
    var mark_string = '-';
    var div_element = null;
    function get_mark_string() {
        return mark_string;
    }
    function mark_x() {
        mark_string = 'x';
        if (div_element !== null)
            div_element.innerText = "X";
    }
    function mark_o() {
        mark_string = 'o';
        if (div_element !== null)
            div_element.innerText = "O";
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
function CreateLine(mark_1, mark_2, mark_3) {
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
    return {
        mark_x: mark_x,
        mark_o: mark_o,
        check_line_win: check_line_win,
        print_line: print_line,
        reset_line: reset_line,
        set_div_element: set_div_element,
        check_all_marked: check_all_marked
    };
}
function CreateBoard() {
    var current_player = 1;
    set_current_player(1);
    var match_status = "on going";
    var score_array = [];
    var reset_match_button = document.querySelector(".reset_match_button");
    reset_match_button.addEventListener("click", reset_or_restart_match);
    var _a = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()], mark_1 = _a[0], mark_2 = _a[1], mark_3 = _a[2];
    var _b = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()], mark_4 = _b[0], mark_5 = _b[1], mark_6 = _b[2];
    var _c = [CreateMarkSpace(), CreateMarkSpace(), CreateMarkSpace()], mark_7 = _c[0], mark_8 = _c[1], mark_9 = _c[2];
    var row_1 = CreateLine(mark_1, mark_2, mark_3);
    var row_2 = CreateLine(mark_4, mark_5, mark_6);
    var row_3 = CreateLine(mark_7, mark_8, mark_9);
    var column_1 = CreateLine(mark_1, mark_4, mark_7);
    var column_2 = CreateLine(mark_2, mark_5, mark_8);
    var column_3 = CreateLine(mark_3, mark_6, mark_9);
    var diagonal_1 = CreateLine(mark_1, mark_5, mark_9);
    var diagonal_2 = CreateLine(mark_7, mark_5, mark_3);
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
        var draw = check_draw();
        if ((!result) && (!draw))
            return;
        // if a win was achieved, then change the text in the reset_match_button to Play Again
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
            if (result_number)
                break;
        }
        if (result_number === 1) {
            console.log("Congratulations! X Won!");
            score_array.push("x");
        }
        else if (result_number === 2) {
            console.log("Congratulations! O Won!");
            score_array.push("o");
        }
        else
            console.log("Game not finished yet");
        return result_number;
    }
    function check_draw() {
        var game_draw = row_1.check_all_marked() && row_2.check_all_marked() && row_3.check_all_marked();
        if (game_draw)
            return;
    }
    function reset_board() {
        for (var _i = 0, board_1 = board; _i < board_1.length; _i++) {
            var line_obj = board_1[_i];
            line_obj.reset_line();
        }
    }
    function set_current_player(player_number) {
        current_player = player_number;
        PlayerDisplay.change_player(player_number);
    }
    function reset_or_restart_match() {
        reset_match_button.textContent = "Reset Match";
        restart_game();
        match_status = "on going";
    }
    return {
        mark_space: mark_space,
        print_board: print_board,
        check_win: check_win
    };
}
var board = CreateBoard();
// board.mark_space(1, 1);
// board.mark_space(0, 1);
// board.mark_space(0, 0);
// board.mark_space(0, 2);
// board.mark_space(0, 2);
// board.mark_space(2, 2);
