const Router = require('express');
const router = Router();

const { getMenu } = require('../modules/nedb')

// /api/menu	GET	Returnerar en kaffemeny
router.get('/', async (request, response)=> {
    const menuResults = await getMenu();
    const resObj = {menu: menuResults};
    response.json(resObj);
    })


module.exports = router;    