export function validateColor(color){
    // We use HSL to check if the color is blue
    let hue = color.hsl.h;
    let saturation = color.hsl.s * 100;
    let light = color.hsl.l * 100;

    // Is it a blue hue?
    if(hue >= 180 && hue <= 260) {
        // Let's make sure it isnt gray, black or white.
        if(saturation > 10 && (light > 10 && light < 97)) {
            //If we get this far, this color is a blueish tone and should not be allowed.
            console.log('BLUEEEE')
            return false;
        } else {
            //If we get here, the color is to dark/light to be considered blue.
            return true;
        }
    } else {
        //The color isn't within the blue hues - so we are good to go!
        return true;
    }
};

export const validateFields = {
    receiver: {
       validate: (value) => value !== '',
       errorMsg: ' Enter the name of the receiver '
    },
    weight: {
        validate: (value) => value >= 0,
        errorMsg: ' The weight cannot be negative '
    },
    country: {
        validate: (value) => value !== '',
        errorMsg: ' Please select a country '
    }
}