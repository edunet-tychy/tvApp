const _getDomElem = (attribute, value) => {
    return document.querySelector(`[${attribute}="${value}"]`);
}

export const mapListToDomElements = (listOfvalue, attribute) => {

    const _viewElems = {};

    for(const value of listOfvalue){
        _viewElems[value] = _getDomElem(attribute, value);
    }

    return _viewElems;
}


export const createDOMElem = (tagNmae, className, innerText, src) => {
    const tag = document.createElement(tagNmae);
    tag.classList = className;

    if (innerText) tag.innerText = innerText;
    if (src) tag.src = src;

    return tag;
}
