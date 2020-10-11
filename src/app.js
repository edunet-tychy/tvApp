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

        this.viewElems.showsWrapper.innerHTML = "";

        for (const { show } of shows) {
            this.createShowCard(show);
        }
    }

    createShowCard = (show) => {
        const divCard = createDOMElem('div', 'card');
        const divCardBody = createDOMElem('div', 'card-body');
        const h5 = createDOMElem('h5', 'card-title', show.name);
        const btn = createDOMElem('button', 'btn btn-primary', 'Show details');

        let img, p;

        if (show.image) {
            img = createDOMElem('img', 'card-img-top', null, show.image.medium);
        } else {
            img = createDOMElem('img', 'card-img-top', null, 'https://via.placeholder.com/210x295');
        }

        if (show.summary) {
            p = createDOMElem('p', 'card-text', `${show.summary.slice(0, 100)}...`);
        } else {
            p = createDOMElem('p', 'card-text', 'Ther is no summary for that show yet');
        }

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(img);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(btn);

        this.viewElems.showsWrapper.appendChild(divCard);
    }
}

document.addEventListener('DOMContentLoaded', new Tvmaze());
