import api from '../apiService';
import config from '../../config/apiConfig';
import axios from 'axios';

jest.mock('axios');

const cities = [{ country_code: 'RU', name: 'Krasnodar', code: 'KRR' }];
const countries = [{ code: 'ES', name: 'Испания', currency: 'EUR' }];
const airlines = [{ code: 'IH', name: 'Южное небо' }];
const prices = {
    currency: 'USD',
    data: {
        '2020-12-21': {
            airline: "S7",
            departure_at: "2020-12-21T22:15:00Z",
            destination: "LED",
            expires_at: "2020-12-21T19:15:00Z",
            flight_number: 2078,
            origin: "KRR",
            price: 96,
            return_at: "2020-12-22T18:45:00Z",
            transfers: 1
        }
    },
    error: '',
    success: true
}

const params = {
    origin: 'KRR',
    destination: 'LED',
    depart_date: '2020-12',
    return_date: '2020-12',
    currency: 'USD'
}

describe('test api service', () => {
    it('success fetch countries', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: countries }));
        await expect(api.countries()).resolves.toEqual(countries);
        expect(axios.get).toHaveBeenCalledWith(`${config.url}/countries`);
    })

    it('success fetch cities', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: cities }));
        await expect(api.cities()).resolves.toEqual(cities);
        expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`);
    })

    it('success fetch airlines', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: airlines }));
        await expect(api.airlines()).resolves.toEqual(airlines);
        expect(axios.get).toHaveBeenCalledWith(`${config.url}/airlines`);
    })

    it('success fetch prices', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: prices }));
        await expect(api.prices(params)).resolves.toEqual(prices);
        expect(axios.get).toHaveBeenCalledWith(`${config.url}/prices/cheap`, { params });
    })

    it('failure fetch countries', async () => {
        const errMsg = 'api error countries';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
        await expect(api.countries()).rejects.toThrow(errMsg);
    })

    it('failure fetch cities', async () => {
        const errMsg = 'api error cities';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
        await expect(api.cities()).rejects.toThrow(errMsg);
    })

    it('failure fetch airlines', async () => {
        const errMsg = 'api error airlines';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
        await expect(api.airlines()).rejects.toThrow(errMsg);
    })

    it('failure fetch prices', async () => {
        const errMsg = 'api error prices';
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
        await expect(api.prices()).rejects.toThrow(errMsg);
    })
});