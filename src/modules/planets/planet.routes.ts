import { Request, Response, Router } from "express";


export default (router: Router): void => {

    router.post('/planets', async (req: Request, res: Response) => {
        res.json({ action: "create" });
    })

    router.get('/planets', async (req: Request, res: Response) => {
        res.json({ action: "list" });

    })

    router.get('/planets/:search', async (req: Request, res: Response) => {
        res.json({ action: "search" });

    })

    router.delete('/planet/:id', async (req: Request, res: Response) => {
        res.json({ action: "delete" });

    })
}