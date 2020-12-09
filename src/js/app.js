import locations from './store/locations';
import favorits from './store/favorits';

import formUi from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';

import './plugins';
import '../css/style.css';

document.addEventListener('DOMContentLoaded', () => {

    initApp();

    const form = formUi.form;

    // Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    // Handlers
    async function initApp() {
        await locations.init();
        formUi.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUi.originValue);
        const destination = locations.getCityCodeByKey(formUi.destinationValue);
        const depart_date = formUi.departDateValue;
        const return_date = formUi.returnDateValue;
        const currency = currencyUI.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });

        ticketsUI.renderTickets(locations.lastSearch, favorits.ticketsIsRendered.bind(favorits));
    }
})