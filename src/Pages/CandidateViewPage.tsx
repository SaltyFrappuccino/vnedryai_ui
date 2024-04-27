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
        // axios.get<Candidate[]>(`http://localhost:8000/candidates/?id=${loc.state?.candidate.id}`)
        //     .then( res=> setCand(res.data[0]))
        axios.get<any>(`http://localhost:8000/candidates_by_vacancy/${ loc.state?.candidate.vacancyId }`)
            .then(res => setCand(res.data.find(el=> {
                return el.id == loc.state?.candidate.id
            })))
        axios.get<any>(`http://localhost:8000/vacancies_by_candidate/${loc.state?.candidate.candidate_id}`)
            .then(res => setAmount(res.data.length))
        axios.get<any>(`http://localhost:8000/vacancies_by_candidate/${loc.state?.candidate.candidate_id}`)
            .then(res => setVacancy(res.data.find(el=> {
                return el.candidate_id == loc.state?.candidate.id
            })))



    }, []);

    const handleChange = (event: SelectChangeEvent<string | number>, child: ReactNode) => {

    };

    const getpTeamAnalyseColor = ()=>{
            if(cand.teamProfileMatch < 10) return "error"
            if(cand.teamProfileMatch < 80) return "warning"
            return "success"
    }

    const [age, setAge] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);


    const getpAcorrdanceColor = ()=>{

            if(cand.resumeMatching < 10) return "error.main"
            if(cand.resumeMatching < 80) return "warning.main"
            return "success.main"
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
                {(cand?.resumeMatching >= 0) ?
                    <WithPopOver text={cand?.resumeMatching + "% соотвествия резюме вакансии" }>
                        <MaterialB sx={{padding: "0", margin: "0 0 0 10px", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                            <Typography sx={{fontFamily: "SB sans Text"}} component="div"><Box sx={{color: getpAcorrdanceColor()}}>{cand.resumeMatching}%</Box></Typography>
                        </MaterialB>
                    </WithPopOver> : ""
                }
                {(cand?.teamProfileMatch >= 0) ?
                    <WithPopOver text={cand?.teamProfileMatch + "% соотвествия профилю команды" }>
                        <MaterialB sx={{padding: "0", margin: "0 0 0 10px", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                            <ThumbUpOffAltIcon color={getpTeamAnalyseColor()}></ThumbUpOffAltIcon>
                        </MaterialB>
                    </WithPopOver> : ""
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