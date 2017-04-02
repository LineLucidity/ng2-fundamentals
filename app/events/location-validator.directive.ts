import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator,
        multi: true}],
})
export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): { [key: string]:any } {
        const addressControl = formGroup.controls['address'];
        const cityControl = formGroup.controls['city'];
        const countryControl = formGroup.controls['country'];
        const onlineURLControl = (formGroup.root as FormGroup).controls['onlineURL'];

        if((addressControl && addressControl.value && cityControl 
            && cityControl.value) || (onlineURLControl 
                && onlineURLControl.value)) {
            return null;
        } else {
            return {validateLocation: false};
        }
    }
}
