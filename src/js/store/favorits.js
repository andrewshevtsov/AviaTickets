import currencyUI from '../views/currency';

class Favorits {
    constructor(currency) {
        this.favorites = [];
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
        this.container = document.getElementById('dropdown1');
    }

    ticketsIsRendered(tickets) {

        const addToFavoritsBtnsCollection = document.querySelectorAll('.add-favorite');

        addToFavoritsBtnsCollection.forEach((btn) => {
            const clickBtnHandler = (e) => {
                const currentTicket = tickets.find((ticket) => ticket.id === e.target.dataset.id);
                this.favorites.push(currentTicket);
                this.renderFavoritItem(currentTicket);
            };
            btn.addEventListener('click', clickBtnHandler);
        });
    }

    renderFavoritItem(currentTicket) {

        let fragment = '';
        const currency = this.getCurrencySymbol();
        const template = this.favoritItemTemplate(currentTicket, currency);

        fragment += template;
        this.container.insertAdjacentHTML('beforeend', fragment);

        this.getCurrentFavoriteItemForDelete(currentTicket);
    }
    
    getCurrentFavoriteItemForDelete(currentTicket) {
        const currentFavoriteItem = document.querySelector(`li[data-id="${currentTicket.id}"]`);
        const currentFavoriteDelBtn = currentFavoriteItem.querySelector('.delete-favorite');

        currentFavoriteDelBtn.addEventListener('click', (e) => {
            const target = e.target;
            this.onDeleteFavoriteHandler(target);
        });
    };

    onDeleteFavoriteHandler(target) {
        const targetLi = target.closest('.favorite-item');
        const targetLiId = targetLi.dataset.id;

        let result = this.favorites.filter((ticket) => {
            return ticket.id !== targetLiId;
        });
        this.favorites = result;
        targetLi.remove();
    }

    favoritItemTemplate(favoriteTicket, currency) {
        const {
            airline_logo,
            origin_name,
            destination_name,
            departure_at,
            price,
            transfers,
            id,
            flight_number } = favoriteTicket;

        return `
            <li class="favorite-item d-flex align-items-start" data-id="${id}">
                <img src="${airline_logo}" class="favorite-item-airline-img"/>
                <div class="favorite-item-info d-flex flex-column">
                    <div class="favorite-item-destination d-flex align-items-center">
                        <div class="d-flex align-items-center mr-auto">
                            <span class="favorite-item-city">${origin_name}</span>
                            <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="medium material-icons">flight_land</i>
                            <span class="favorite-item-city">${destination_name}</span>
                        </div>
                    </div>
                <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${departure_at}</span>
                    <span class="ticket-price ml-auto">${currency}${price}</span>
                </div>
                <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${flight_number}</span>
                </div>
                <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">
                    <i class="material-icons">clear</i>
                </a>
                </div>
            </li>
        `
    }
}

const favorits = new Favorits(currencyUI);

export default favorits;
