export const GET_BOXES = 'GET_BOXES';

const getBoxes = (boxes) => ({
    type: GET_BOXES,
    boxes
})

// Action creator that gets all the boxes
export const getAllBoxes = () =>(dispatch) => {
    fetch('http://localhost:8080/orders/all')
        .then(res => res.json())
        .then(data => dispatch(getBoxes(data)))
        .catch(err => console.log(err))
}

// Action creator that adds a new box and then gets all of them again
export const addNewBox = (box) =>(dispatch) => {
    console.log('Box to be added: ')
    console.log(box)

    fetch('http://localhost:8080/orders/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(box)
    })
        .then(result => {
            return result.json()
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}