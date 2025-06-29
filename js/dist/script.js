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
function CreateMarkSpace() {
    var mark_string = '-';
    function get_mark_string() {
        return mark_string;
    }
    function mark_x() {
        mark_string = 'x';
    }
    function mark_o() {
        mark_string = 'o';
    }
    function mark_from_string(x_or_o) {
        if (x_or_o === 'x')
            mark_x();
        else if (x_or_o === 'o')
            mark_o();
    }
    function reset_mark() {
        mark_string = '-';
    }
    function is_marked() {
        return (mark_string === 'x') || (mark_string === 'o');
    }
    return {
        get_mark_string: get_mark_string,
        mark_x: mark_x,
        mark_o: mark_o,
        mark_from_string: mark_from_string,
        reset_mark: reset_mark,
        is_marked: is_marked
    };
}
function CreateLine(mark_1, mark_2, mark_3) {
    var line_array = [mark_1, mark_2, mark_3];
    function mark(x_or_o, array_position) {
        var mark_object = line_array[array_position];
        if (mark_object.is_marked()) {
            console.log("position already marked with " + mark_object.get_mark_string());
            return;
        }
        mark_object.mark_from_string(x_or_o);
    }
    function mark_x(array_position) {
        mark('x', array_position);
    }
    function mark_o(array_position) {
        mark('o', array_position);
    }
    function get_array_strings() {
        return [line_array[0].get_mark_string(), line_array[1].get_mark_string(), line_array[2].get_mark_string()];
    }
    function check_line_win() {
        var array_strings = get_array_strings();
        if (AllEqual.all_equal(array_strings, 'x'))
            return 1;
        if (AllEqual.all_equal(array_strings, 'o'))
            return 2;
        return 0;
    }
    function print_line() {
        console.log(get_array_strings().join(" "));
    }
    return {
        mark_x: mark_x,
        mark_o: mark_o,
        check_line_win: check_line_win,
        print_line: print_line
    };
}
function CreateBoard() {
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
    function mark_x(i, j) {
        board[i].mark_x(j);
    }
    function mark_o(i, j) {
        board[i].mark_o(j);
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
        if (result_number === 1)
            console.log("Congratulations! X Won!");
        else if (result_number === 2)
            console.log("Congratulations! O Won!");
        else
            console.log("Game not finished yet");
    }
    return {
        mark_x: mark_x,
        mark_o: mark_o,
        print_board: print_board,
        check_win: check_win
    };
}
var board = CreateBoard();
