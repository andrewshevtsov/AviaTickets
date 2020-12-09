import currencyUI from './currency';

class TicketsUI {

    constructor(currency) {
        this.container = document.querySelector('.ticket-section .row');
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    }

    renderTickets(tickets, ticketsIsRendered) {

        this.clearContainer();

        if (!tickets.length) {
            this.showEmptyMsg();
            return;
        }

        let fragment = '';
        const currency = this.getCurrencySymbol();

        tickets.forEach(ticket => {
            const template = TicketsUI.ticketTemplate(ticket, currency);
            fragment += template;
        });
        this.container.insertAdjacentHTML('afterbegin', fragment);

        ticketsIsRendered(tickets);
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    showEmptyMsg() {
        const template = TicketsUI.emptyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', template);
    }

    static emptyMsgTemplate() {
        return `
            <div class="card-panel pink lighten-5 text-center w-100">
                <strong>По вашему запросу билетов не найдено</strong>
            </div>
        `
    }

    static ticketTemplate(ticket, currencySymbol) {

        return `
            <div class="card col s5">
                <div class="card-content">
                <div class="card-header d-flex align-items-center">
                    <span class="card-header-logo">
                        <img src="${ticket.airline_logo}">
                    </span>
                    <span class="card-header-title">${ticket.airline_name}</span>
                </div>
                <div class="card-route d-flex justify-items-between">
                    <span class="card-route-title">${ticket.origin_name}
                        <i class="material-icons">flight_takeoff</i>
                    </span>
                    <span class="card-route-title">
                        <i class="material-icons">flight_land</i>
                        ${ticket.destination_name}
                    </span>
                </div>
                <div class="card-footer">
                    <div class="card-footer-info">
                        <span class="card-footer-date">${ticket.departure_at}</span>
                        <span class="card-footer-detail">
                            Пересадок: ${ticket.transfers}<br> Номер рейса: ${ticket.flight_number}
                        </span>
                        <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
                            data-id="${ticket.id}">
                            Add to favorites
                        </a>
                    </div>
                    <div class="card-footer-price purple darken-3">
                        <span>${currencySymbol}${ticket.price}</span>
                    </div>
                </div>
                </div>
            </div>
        `
    }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;