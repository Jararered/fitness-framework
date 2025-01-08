const HandleRepsInput = (repsString: string): number[] => {
    // Split the string by commas/periods/slashes/backslashes
    const repsArray = repsString.split(/,|\.|\//);

    // Convert the string array to a number array
    const reps = repsArray.map(rep => parseInt(rep));

    // Filter out NaN values
    return reps.filter(rep => !isNaN(rep));
}

export default HandleRepsInput;