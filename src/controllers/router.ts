import { Router, Request, Response } from 'express';
import { 
    TutorById, Tutors, UpdateTutor, CreateTutor, 
    DelTutor
} from '../services/tutor';
import { 
    CreatePet, DeletePet, UpdatePet 
} from '../services/pet';
import { login } from '../services/login';
import auth from '../middleware/auth';


/*---------------------Gets e Posts----------------*/
const router = Router();

export default router
.get("/home", (req: Request, res: Response) => {
    res.status(200).send("API Working!");
})
.get("/GET/tutors", auth, Tutors)
.get("/GET/tutor/:id", auth, TutorById)
.post("/POST/tutor", CreateTutor)
.put("/PUT/tutor/:id", auth, UpdateTutor)
.delete("/DELETE/tutor/:id", auth, DelTutor)
.post("/POST/pet/:tutorId", auth, CreatePet)
.put("/PUT/pet/:petId/tutor/:tutorId", auth, UpdatePet)
.delete("/DELETE/pet/:petId/tutor/:tutorId", auth, DeletePet)
.post("/auth", login);
