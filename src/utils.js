export const bubbleSort = (array) => {
    const len = array.length;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (array[j - 1].scoreDate < array[j].scoreDate) {
                let tmp = array[j - 1];
                array[j - 1] = array[j];
                array[j] = tmp;
            }
        }
    }
    return array;
}

export const parserContent = (string, pH) => {
    const array = string.toString().split("|");
    const result = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (pH) {
            result.push(<p>{element}</p>);
        } else {
            result.push(<h5>{element}</h5>);
        }
        result.push(<br />);
    }
    return result;
}