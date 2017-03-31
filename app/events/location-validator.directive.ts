import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms'

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator,
        multi: true}]
})
export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): { [key: string]:any } {
        let addressControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        let countryControl = formGroup.controls['country'];
        let onlineURLControl = (<FormGroup>formGroup.root).controls['onlineURL'];

        if((addressControl && addressControl.value && cityControl 
            && cityControl.value) || (onlineURLControl 
                && onlineURLControl.value)) {
            return null;
        } else {
            return {validateLocation: false}
        }
    }
}