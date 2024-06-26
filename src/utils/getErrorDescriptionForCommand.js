export function getErrorDescriptionForCommand(command) {
    let desc;
    switch (command) {
        case "cls":
            desc = "clear_screen";
            break;
        case "help":
            desc = "show_suggest";
            break;
        case "ls":
            desc = "show_project";
            break;
        case "ps":
            desc = "show_about";
            break;
        case "sk":
            desc = "show_skill";
            break;
        case "fn":
            desc = "function";
            break;
        default:
            desc = "not_supported";
            break;
    }
    return desc;
}
