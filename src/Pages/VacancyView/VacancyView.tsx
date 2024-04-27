import {Alert, Button as MaterialButton, Container, Grid, MenuItem, Select, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {vacancy as vacancyStub} from "../../utils/utils.ts";
import {ICandidate, IVacancy} from "../../types/types.ts";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {WithPopOver} from "../../HOCs/WithPopOver.tsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Button, Stack} from "@mui/joy";
import CandidateCard from "./CandidateCard.tsx";
import axios from "axios";
import * as React from "react";
import {Modal, Sheet, ModalClose } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from "@mui/material/Box";
import {TimePicker} from "@mui/x-date-pickers";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



function VacancyView() {

    const navigate = useNavigate();

    const location = useLocation()

    const [open, setOpen] = React.useState(false);
    const [countOfDates, setCountOfDates] = useState(1)
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const [vacancy, setVacancy] = useState<IVacancy>()
    const [can, setCan] = useState<ICandidate[]>()
    console.log(vacancy)
    useEffect(() => {
        axios.get<any>(`https://gigachat-hr.onrender.com/candidates_by_vacancy/${location.state}`)
            .then(res => setCan(res.data))
        axios.get<any>(`https://gigachat-hr.onrender.com/vacancies/?id=${location.state}`)
            .then(res => setVacancy(res.data[0]))
    }, []);

    const renderCardGroup = (type: string) => {
        let canToRender = can?.filter((el) => {
            return el.status == type
        })
        return canToRender?.map((candidate: ICandidate) => {
            return (
                    <Grid item xs={5}>
                        <CandidateCard {...candidate} key={candidate.id} vacancyId={location.state} />
                    </Grid>
                    )
        })
    }

    const renderDateGroup = (type: string) => {
        let dateGroup = []
        console.log(countOfDates)
        for (let i = 0; i < countOfDates; i++) {
            console.log(dateGroup)
            dateGroup.push(<Stack direction="row" justifyContent={"space-around"} sx={{marginTop: "20px"}}>
                <DatePicker disablePast label="Выберите дату" />
                <TimePicker label="Выберите время" />

            </Stack>)
        }
        return dateGroup
    }

    return (
        <>
            <Container maxWidth="lg" sx={{marginTop: "20px"}}>
                <Stack spacing={2}>
                    <Typography sx={{fontFamily: "SB sans Text", fontSize: "18px", fontWeight: "600"}} variant="h5" gutterBottom >
                        {vacancy?.title}
                    </Typography>
                    <Typography sx={{fontFamily: "SB sans Text"}} variant="caption" gutterBottom>
                        Позиция: {vacancy?.positionNumber} <Typography sx={{fontFamily: "SB sans Text"}} variant="caption" sx={{display:"inline"}}>{vacancy?.createdAt}</Typography>
                    </Typography>
                    <Stack direction={"row"} spacing={5}>
                        <Button sx={{width: "150px", height: "40px" }}>Смотреть бриф</Button>
                        <Button sx={{width: "230px", height: "40px", marginLeft: "30px"}} onClick={handleOpen}>Добавить слоты для интевью</Button>

                    </Stack>
                        <MaterialButton sx={{paddingLeft: "0"}}>
                            <Typography sx={{fontFamily: "SB sans Text"}} variant="caption" color="info" gutterBottom sx={{margin: "0 0 0 5px"}}>
                                Команда
                            </Typography>
                            <AddCircleOutlineIcon color="info"></AddCircleOutlineIcon>
                        </MaterialButton>
                    <Typography sx={{fontFamily: "SB sans Text", fontSize: "18px", fontWeight: "600"}} variant="h4" gutterBottom >
                        Рекомендованные из Сбера:
                    </Typography>
                    <Typography sx={{fontFamily: "SB sans Text", fontSize: "18px", fontWeight: "600"}} variant="h4" gutterBottom >
                        Рассмотрение заказчиком
                    </Typography>
                    <Grid container  gap={"20px"} width={"100%"}  justifyContent="space-between">
                        {renderCardGroup("intresting")}
                    </Grid>
                    <Typography sx={{fontFamily: "SB sans Text", fontSize: "18px", fontWeight: "600"}} variant="h4" gutterBottom >
                         Новые
                    </Typography>
                    <Grid container  gap={"20px"} width={"100%"}  justifyContent="space-between">
                        {renderCardGroup("new")}
                    </Grid>
                    <Typography sx={{fontFamily: "SB sans Text", fontSize: "18px", fontWeight: "600"}} variant="h4" gutterBottom >
                        Отклоненные
                    </Typography>
                    <Grid container  gap={"20px"} width={"100%"}  justifyContent="space-between">
                        {renderCardGroup("declined")}
                    </Grid>

                </Stack>
            </Container>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 700,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose  variant="plain" sx={{ m: 1 }} />
                    <Typography
                        sx={{fontFamily: "SB sans Text", fontSize: "18px", fontWeight: "600"}}
                        id="modal-title"
                    >
                        Выберите дату и время интервью
                    </Typography>
                    {renderDateGroup()}
                    <Stack direction="row" justifyContent={"space-between"} sx={{marginTop: "20px"}}>
                        <MaterialButton disabled={countOfDates > 2} sx={{paddingLeft: "0"}} onClick={()=>{setCountOfDates(countOfDates + 1)}}>
                            <AddCircleOutlineIcon color={countOfDates > 2? "disabled": "info"} ></AddCircleOutlineIcon>
                        </MaterialButton>
                        <Button onClick={handleClose}>Сохранить</Button>
                        <MaterialButton disabled={countOfDates <= 1}  sx={{paddingLeft: "0"}} onClick={()=>{setCountOfDates(countOfDates - 1)}}>
                            <RemoveCircleOutlineIcon color={countOfDates <= 1? "disabled": "info"} ></RemoveCircleOutlineIcon>
                        </MaterialButton>

                    </Stack>

                </Sheet>
            </Modal>
        </>
    )
}

export default VacancyView







