import { mapListToDomElements, createDOMElem } from './domInteractions.js';
import { getShowsByKey } from './requests.js';

class Tvmaze {
    constructor() {
        this.viewElems = {};
        this.showNameButtons = {};
        this.selectedName = "harry";
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectDomElement();
        this.setupListeners();
        this.featchAndDisplayShows();
    }

    connectDomElement = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(
            document.querySelectorAll('[data-show-name]')
        ).map(elem => elem.dataset.showName);

        this.viewElems = mapListToDomElements(listOfIds, 'id');
        this.showNameButtons = mapListToDomElements(listOfShowNames, 'data-show-name');
    }

    setupListeners = () => {
        Object.keys(this.showNameButtons).forEach(showName => {
            this.showNameButtons[showName].addEventListener('click', this.setCurrentNameFilter);
        })
    }

    setCurrentNameFilter = (event) => {
        this.selectedName = event.target.dataset.showName;
        this.featchAndDisplayShows();
    }

    featchAndDisplayShows = () => {
        getShowsByKey(this.selectedName).then(shows => this.renderCards(shows));
    }

    renderCards = (shows) => {
        for (const { show } of shows) {
            this.createShowCard(show);
        }
    }

    createShowCard = (show) => {
        const divCard = createDOMElem('div', 'card');
        const img = createDOMElem('img', 'card-img-top', null, show.image.medium);
        const divCardBody = createDOMElem('div', 'card-body');
        const h5 = createDOMElem('h5', 'card-title', show.name);
        const p = createDOMElem('p', 'card-text', show.summary);
        const btn = createDOMElem('button', 'btn btn-primary', 'Show details');

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(img);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(btn);

        this.viewElems.showsWrapper.appendChild(divCard);
    }
}

document.addEventListener('DOMContentLoaded', new Tvmaze());
