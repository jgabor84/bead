import { Request, Router } from 'express';
import { AccountController } from './controller/account.controller';
import { UserController } from './controller/user.controller';
import { AuthController } from './controller/AuthController';
import { TransactionController } from './controller/transaction.controller';
import { checkJwt } from "./middlewares/checkJwt";
import { checkRole } from "./middlewares/checkRole";
import { mail } from "./middlewares/mail";
import { WineController } from './controller/wine.controller';
import { ReviewController } from './controller/review.controller';
import { CarouselController } from './controller/carousel.controller';
import { CartController } from './controller/cart.controller';
import { CartItemController } from './controller/cartItem.controller';

export function getRouter(): Router {

  const path = require('path');
    const multer = require('multer');

    const PATH = './uploads';
    

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
});
let fn = storage.filename;

let upload = multer({
  storage: storage
});


    const router = Router();

    const accountController = new AccountController();
    const transactionController = new TransactionController();    
    const userController = new UserController();
    const authController = new AuthController();
    const wineController = new WineController();
    const reviewController = new ReviewController();
    const carouselController = new CarouselController();
    const cartController = new CartController();
    const cartItemController = new CartItemController();

    

    router.get('/account', accountController.getAll);
    router.get('/account/:id', accountController.getOne);
    router.get('/client-accounts/:id', accountController.getClientAccounts);
    router.get('/getaccid/:id', accountController.createAccountNumber);
    router.post('/account', accountController.create);
    router.put('/account', accountController.update);
    router.delete('/account/:id', accountController.delete);

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.put('/delete-user', userController.delete);
    router.post('/set-admin', userController.setAdmin);

    router.get('/transactions', transactionController.getAll);
    router.get('/report/:id', transactionController.getAccountTransactions);
    router.post('/transaction', transactionController.create);

    router.post('/add-wine', wineController.create);
    router.get('/wines', wineController.getAll);
    router.get('/wines/:id', wineController.getOne);

    router.get('/get-wine-ratings/:id', reviewController.getRating);

    

    router.post('/login', authController.login);
    router.post('/change-password', [checkJwt], authController.changePassword);

    //Get all users
    router.get("/", [checkJwt, checkRole(["ADMIN"])], userController.listAll);

    // Get one user
  router.get("/user/:id",[checkJwt, checkRole(["ADMIN"])], userController.getOneById);

  router.get("/admin", [checkJwt, checkRole(["ADMIN"])], userController.adminBoard);

  //Create a new user
  router.post("/new-user", [mail],  userController.newUser);

  //Add review
  router.post("/add-review",  [checkJwt, checkRole(["USER"])], reviewController.create);
  router.get("/get-wine-review/:id",  reviewController.getWineReviews);

  //add carousel
  router.post("/add-carousel",   carouselController.create);
  //delete carousel
  router.put('/delete-carousel',[checkJwt, checkRole(["ADMIN"])], carouselController.delete);
  router.get("/get-carousel",  carouselController.getAll);
  router.get("/get-maxid",  carouselController.getMaxId);

  router.get("/top-rating",  reviewController.getTopRating);

  //save cart
  router.post("/save-cart",   cartController.create);
 //add cart item
 router.post("/add-cart-item",   cartItemController.create);
 router.get("/cart-item/:id",  cartItemController.getCartItems);
 router.delete("/cart-item/:id",  cartItemController.delete);
  //get cart
  router.get("/carts/:id",  cartController.getCart);

    

  //Edit one user
  

  //Delete one user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    userController.deleteUser
  );
  interface MulterRequest extends Request {
    file: any;
}

  router.post('/upload', upload.single('image'), function (req:MulterRequest , res) {
    if (!req.file) {
      console.log("No file is available!");
      return res.send({
        success: false
      });
  
    } else {
      console.log('File is available!'+fn);
      return res.send({
        success: true,
        file:req.file.filename
      })
    }
  });


    

    return router;
}
