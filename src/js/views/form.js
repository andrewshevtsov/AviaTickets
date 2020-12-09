import { getAutocompleteInstance, getDatePickerInstance } from '../plugins/materialize';

class FormUI {
    constructor(autoCompleteInstance, datePickerInstance) {
        // form
        this._form = document.forms['locationsControl'];

        // Form elements
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');

        // Materialize instances
        this.originAutocomplete = autoCompleteInstance(this.origin);
        this.destinationAutocomplete = autoCompleteInstance(this.destination);
        this.departDatePicker = datePickerInstance(this.depart);
        this.returnDatePicker = datePickerInstance(this.return);
    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departDateValue() {
        return this.departDatePicker.toString();
    }

    get returnDateValue() {
        return this.returnDatePicker.toString();
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUi = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUi;