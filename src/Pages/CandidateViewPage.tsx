import {useLocation} from "react-router-dom";
import {ReactNode, useEffect, useState} from "react";
import axios from "axios";
import {Stack, Textarea} from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import {Button as MaterialB, Container, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Button} from "@mui/joy";
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import {WithPopOver} from "../HOCs/WithPopOver.tsx";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {Categories} from "../types/types.ts";
import * as React from "react";
import {grades} from "../randomizers/rundom.ts";

interface Candidate {
    "id":  number,
    "fio": string,
    "inStatusTime": string,
    "accordance": number,
    "teamAnalys": number,
    "changeWork": number,
    "diffrentRegion": number,
    "incorrectGraduate": number,
    "badExperience": number,
    "skillIssue": number,
    "noContact": number,
    "content": string,
    "category": "string"
}
export function CandidateViewPage() {
    const loc = useLocation()

    const [cand, setCand] = useState<Candidate>({})
    const [isPopupOpened, setIsPopupOpened] = useState(false)
    const [amount, setAmount] = useState()
    const [vacancy, setVacancy] = useState()
    useEffect(() => {
        // axios.get<Candidate[]>(`https://gigachat-hr.onrender.com/candidates/?id=${loc.state?.candidate.id}`)
        //     .then( res=> setCand(res.data[0]))
        axios.get<any>(`https://gigachat-hr.onrender.com/candidates_by_vacancy/${loc.state?.candidate.id}`)
            .then(res => setCand(res.data.find(el=> {
                return el.id == loc.state?.candidate.id
            })))
        axios.get<any>(`https://gigachat-hr.onrender.com/vacancies_by_candidate/${loc.state?.candidate.vacancyId}`)
            .then(res => setAmount(res.data.length))
        axios.get<any>(`https://gigachat-hr.onrender.com/vacancies_by_candidate/${loc.state?.candidate.vacancyId}`)
            .then(res => setVacancy(res.data.find(el=> {
                return el.candidate_id == loc.state?.candidate.id
            })))



    }, []);

    const handleChange = (event: SelectChangeEvent<string | number>, child: ReactNode) => {

    };


    const getpTeamAnalyseColor = ()=>{
        if((typeof cand.teamAnalys != "undefined")) {
            if(cand.teamAnalys < 10) return "error"
            if(cand.teamAnalys < 80) return "warning"
            return "success"
        }
    }

    const [age, setAge] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);


    const getpAcorrdanceColor = ()=>{

        if((typeof cand.teamAnalys != "undefined")) {
            if(cand.accordance < 10) return "error.main"
            if(cand.accordance < 80) return "warning.main"
            return "success.main"
        }
    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const select = (e) => {
        setSelectedGradeName(e.currentTarget.id.split("_")[1])
        setSelectedPos(e.currentTarget.id.split("_")[0]);
        console.log(e.currentTarget)
    };

    const downloadResume = () =>{
        cand.content
        const linkSource = `data:application/pdf;base64,${cand.content}`;
        const downloadLink = document.createElement("a");
        const fileName = "Резюме.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }


    return (
        <Container maxWidth="lg" sx={ {marginTop: "20px"}}>
            <Stack direction="row"
                   alignItems="center"

                // justifyContent="space-between"
            >
                <Box sx={{width: "15%", height: "15%"}}>
                    <Avatar size="lg" sx={{width: "150px", height: "150px"}} src={cand?.photo_url}></Avatar>
                </Box>
                <Typography sx={{fontFamily: "SB sans Text", margin: "0 0 0 20px"}}  level="title-lg">{cand?.fio}</Typography>
                {(typeof cand?.accordance != "undefined") &&
                    <WithPopOver text={cand?.accordance + "% соотвествия резюме вакансии" }>
                        <MaterialB sx={{padding: "0", margin: "0 0 0 10px", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                            <Typography sx={{fontFamily: "SB sans Text"}} component="div"><Box sx={{color: getpAcorrdanceColor()}}>{cand.accordance}%</Box></Typography>
                        </MaterialB>
                    </WithPopOver>
                }
                {(typeof cand?.teamAnalys != "undefined") &&
                    <WithPopOver text={cand?.teamAnalys + "% соотвествия профилю команды" }>
                        <MaterialB sx={{padding: "0", margin: "0 0 0 10px", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                            <ThumbUpOffAltIcon color={getpTeamAnalyseColor()}></ThumbUpOffAltIcon>
                        </MaterialB>
                    </WithPopOver>
                }
            </Stack>
            <Typography sx={{fontFamily: "SB sans Text", marginTop: "30px"}} component="h5">Контакты</Typography>
            <Stack direction="row"
                justifyContent="space-between"
                   sx={{ marginTop: "30px"}}>
                    <Box>
                        <Typography sx={{fontFamily: "SB sans Text"}} level="title-md">{cand?.phone_num}</Typography>
                        <Typography sx={{fontFamily: "SB sans Text"}} level="body-sm">Основной</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{fontFamily: "SB sans Text"}} level="title-md">{cand?.email}</Typography>
                        <Typography sx={{fontFamily: "SB sans Text"}} level="body-sm">Основной</Typography>

                    </Box>

                    <Box>
                        <Typography sx={{fontFamily: "SB sans Text", cursor: "pointer"}} level="title-md" onClick={downloadResume}>Резюме.pdf</Typography>
                        <Typography sx={{fontFamily: "SB sans Text"}} level="body-sm">Основной</Typography>

                    </Box>
                </Stack>
            <Box sx={{ marginTop: "50px"}}>
                <Typography sx={{fontFamily: "SB sans Text"}} level="title-md">Главный инженер по разработке</Typography>
                <Typography sx={{fontFamily: "SB sans Text"}} level="body-sm">234234324</Typography>
                <Typography sx={{fontFamily: "SB sans Text"}} level="body-sm">Позиция 9867987698 Москва</Typography>
            </Box>
            <Stack direction="row"
                   // justifyContent="space-between"
                   sx={{ marginTop: "30px"}}
                   alignItems="center"
                   spacing={2}
            >
                <Box>
                    <Typography sx={{fontFamily: "SB sans Text"}} level="body-sm">Текущий статус: <Typography sx={{fontFamily: "SB sans Text"}} display={"inline"} fontWeight="lg">{Categories[cand?.status]}</Typography></Typography>
                </Box>
                <Box>
                    <Button sx={{ height: "40px"}} onClick={handleOpen}>
                        Изменить статус
                    </Button>
                </Box>
            </Stack>

            <Box sx={{ marginTop: "50px"}}>
                        <WarningAmberIcon
                            sx={{ position: "relative", top: "5px", paddingRight: "5px" }}
                        ></WarningAmberIcon>
                    <Typography sx={{fontFamily: "SB sans Text"}} display={"inline"}>
                        <Box sx={{color: "info.main"}} display={"inline"}>
                            Расматривается на вакансии: {amount}</Box>
                    </Typography>

            </Box>

            <Box sx={{ marginTop: "50px"}}>
                <Typography sx={{fontFamily: "SB sans Text"}} display={"inline"} fontWeight="lg">Тесты</Typography>
                <Textarea minRows={2} value={"export enum GoalProgressMeasurements {\n" +
                    "    Percentage,\n" +
                    "    Numeric_Target,\n" +
                    "    Completed_Tasks,\n" +
                    "    Average_Milestone_Progress,\n" +
                    "    Not_Measured\n" +
                    "}\n" +
                    "\n" +
                    "console.log(ToArray(GoalProgressMeasurements));\n"} />
            </Box>
        </Container>
    )
}