import { Router } from "express";
import { DeleteBuildingHandle, StoreBuildingHandle, SearchBuildingHandle, StoreBuildImgsHandle, PaginationHandle, GetAllHandle, GetAllPhotoHandle, GetPhotoHandle } from '../controllers/Build.controller';
import { notExists } from "../controllers/User.controller";
import ChickIfAuth from "../middleware/ChickIfAuth";
import ValidateResource from "../middleware/ValidateResource";
import { StoreHouesSchema, GetPaginationSchema } from '../Schema/House.schema';
import multer from 'multer';
import fs, { mkdir, mkdirSync } from "fs";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationFolder =path.join(__dirname,`../../uploads/${req.params.id}`);
    
    if (!fs.existsSync(destinationFolder)) {
      console.log('====================================');
      console.log('mkdir');
      console.log('====================================');
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    
    cb(null, path.join(__dirname,`../../uploads/${req.params.id}`));
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const fileName = `${timestamp}.${file.mimetype.slice(file.mimetype.indexOf('/')+1)}`;
    cb(null, fileName);
  },
});

const fileFilter:any =  (req: Request, file: Express.Multer.File, callback: any) =>{
  if (file.mimetype.startsWith("image/")) {
    callback(null,true)
  } else {
    callback(new Error("unsupported file"),false)
  }
};

const upload = multer({ storage: storage,fileFilter: fileFilter })

const router: Router = Router();

router.post('/store', [ValidateResource(StoreHouesSchema),ChickIfAuth],StoreBuildingHandle)
router.post('/store-imgs/:id', [upload.array('file', 50), ChickIfAuth], StoreBuildImgsHandle)
router.get('/pagination/:pgnum/:pgsize', [ValidateResource(GetPaginationSchema)], PaginationHandle);
router.get('/',GetAllHandle)
router.get('/search', [ChickIfAuth], SearchBuildingHandle)
router.delete('/delete',ChickIfAuth, DeleteBuildingHandle)
router.get('/all-photos',ChickIfAuth,GetAllPhotoHandle)
router.get('/photos/:id',ChickIfAuth,GetPhotoHandle)

router.all("*",notExists)

export default router;