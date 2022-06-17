const Router = require('express');
const router = Router();

const { checkMenu, removeProduct, addToMenu } = require('../modules/nedb')
const { auth } = require('../middleware');

router.post('/', auth, async (request, response) => {
    const credentials = request.body;

    if (credentials.hasOwnProperty('id') && credentials.hasOwnProperty('title') && credentials.hasOwnProperty('desc') && credentials.hasOwnProperty('price')) {
           const result = await checkMenu(credentials);
           if(result.length > 0) {
               const resObj = {
                   error: 'This product already exists.'
               }

               response.status(400).json(resObj);
           } if (result.length === 0) {

               const resObj = credentials;
               addToMenu(resObj)
   
               response.status(200).json(resObj)
           }

       } else {
           const resObj = {
               error:'Error, please include id, title, desc and price.'
           } 

           response.status(400).json(resObj);
       }
})

router.delete('/:id', auth, async (request, response) => {
   const id = request.params.id;

   const result = await removeProduct(id);
   if(result === 0) {
       const resObj = {
           error: `There is product no with ID ${id}.`
       }
       response.status(400).json(resObj)
   } else {
       const resObj = {
           message: `Product with ID ${id} has been removed.`
       }
       response.status(200).json(resObj)
   }

})

module.exports = router;