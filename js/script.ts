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


function CreateMarkSpace() {
    let mark_string = '-';

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
        if (x_or_o === 'x') mark_x();

        else if (x_or_o === 'o') mark_o();
    }

    function reset_mark() {
        mark_string = '-';
    }

    function is_marked() {
        return (mark_string === 'x') || (mark_string === 'o');
    }

    return {
        get_mark_string,
        mark_x,
        mark_o,
        mark_from_string,
        reset_mark,
        is_marked
    }
}


function CreateLine(mark_1: typeof CreateMarkSpace, mark_2: typeof CreateMarkSpace, mark_3: typeof CreateMarkSpace) {
    const line_array = [mark_1, mark_2, mark_3];

    function mark(x_or_o: string, array_position: number) {
        const mark_object = line_array[array_position];

        if ( mark_object.is_marked() ) {
            console.log(`position already marked with ${mark_object.get_mark_string()}`)
            return
        }

        mark_object.mark_from_string(x_or_o);
    }

    function mark_x(array_position: number) {
        mark('x', array_position);
    }

    function mark_o(array_position: number) {
        mark('o', array_position);
    }

    function get_array_strings() {
        return [line_array[0].get_mark_string(), line_array[1].get_mark_string(), line_array[2].get_mark_string()]
    }

    function check_line_win() {
        const array_strings = get_array_strings();

        if ( AllEqual.all_equal(array_strings, 'x') ) return 1

        if ( AllEqual.all_equal(array_strings, 'o') ) return 2
        
        return 0
    }

    function print_line() {
        console.log(get_array_strings().join(" "));
    }

    return {
        mark_x,
        mark_o,
        check_line_win,
        print_line
    };
}


function CreateBoard() {
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

    function mark_x(i: number, j: number) {
        board[i].mark_x(j);
    }

    function mark_o(i: number, j: number) {
        board[i].mark_o(j);
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
    }

    return {
        mark_x,
        mark_o,
        print_board,
        check_win
    }
}


const board = CreateBoard();
