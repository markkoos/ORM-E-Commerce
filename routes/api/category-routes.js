const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll( { 
      include: [{ model: Product }]
    });
  
    res.status(200).json(catData);
  
   } catch (error) {
      res.status(500).json(error);
   }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!catData) {
      res.status(404).json({ message: 'No data with that id' });
    }

    res.status(200).json(catData);

  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category

  try {
    const catData = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(200).json(catData);
    
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try { 
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    res.status(200).json(catData);

  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try { 
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(catData);

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
