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
