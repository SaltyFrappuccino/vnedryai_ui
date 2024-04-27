import {Container, Button as MaterialButton, Typography, Grid, Backdrop, Alert, Box} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useState} from "react";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {Input, Option, Select, Textarea, Button, Stack, CircularProgress} from "@mui/joy";
import {stringCallback, stringSelectCallback} from "../../utils/utils.ts";
import {WithPopOver} from "../../HOCs/WithPopOver.tsx";
import {clarifyVacancy, createVacancy} from "../../api/api.ts";
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    position: string
    salarySplash: string;
    finalVacancy: string;
    setFinalVacancy: (vacancy: string) => void;
    setPos: any;
}

function DescriptionCreate(props: Props) {

    const count = Number(localStorage.getItem("count"))
    const [isLoading, setIsLoading] = useState(false)

    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState("")
    const [profile, setProfile] = useState("")
    const [clarification, setClarification] = useState("")
    const [feedback, setFeedback] = useState(false)

    const [pos, setPos] = useState(props.position)
    const [isRedacted, setIsReducted] = useState(false)

    const onPosChange = (e) => {
        setPos(e.target.value)
        props.setPos(e.target.value)
    }

    const onVacancyCreate = () => {
        setIsLoading(true)
        createVacancy(skills, profile)
            .then((res) => props.setFinalVacancy(res.data[2].content))
            .finally(() => {
                setIsLoading(false)
                setFeedback(true)
            })
    }
    const onClarification = () => {
        setIsLoading(true)
        clarifyVacancy(props.finalVacancy + " \n " + clarification )
            .then((res) => props.setFinalVacancy(res.data[2].content))
            .finally(() => setIsLoading(false))

    }
    const onCloseAlert = () => {
        setFeedback(false)
    }


    return (
        <>
            <Container >
                <Grid container spacing={2} sx={{paddingBottom: "20px"}}>
                    <Grid item xs={6}>
                        <Box sx={{padding:"0"}}>
                            {feedback && <Alert icon={false} sx={{position: "fixed", top:"20px", right: "20px", zIndex:10}} severity="info">Оцените работу модели
                                <MaterialButton onClick={onCloseAlert} >
                                    <ThumbDownIcon fontSize={"small"} color="info"></ThumbDownIcon>
                                </MaterialButton>
                                <MaterialButton sx={{paddingLeft: "0"}} onClick={onCloseAlert}>
                                    <ThumbUpIcon fontSize={"small"} color="info"></ThumbUpIcon>
                                </MaterialButton>
                            </Alert>}
                            {isRedacted?
                                <Input sx={{width: "50%"}} onBlurCapture={(e)=>{
                                    e.target.focus()
                                    setIsReducted(false)
                                }} value={pos} onChange={onPosChange}></Input>
                                :
                                <Stack direction={"row"}>
                                    <Typography sx={{fontFamily: "SB sans Text", fontSize: "22px", fontWeight: "600"}} variant="h5" gutterBottom >
                                        {pos}
                                    </Typography>
                                    <EditIcon onClick={()=>{setIsReducted(true)}}  sx={{position: "relative", top: "5px", left: "5px", cursor: "pointer", }}></EditIcon>
                                </Stack>


                            }
                            <Typography sx={{fontFamily: "SB sans Text"}} variant="caption" gutterBottom>
                                Номер позиции: {count}
                            </Typography>
                            <Typography sx={{fontFamily: "SB sans Text"}} variant="subtitle1" gutterBottom>
                                {props.salarySplash}
                            </Typography>
                            {/*<WithPopOver text={""}>*/}
                                <MaterialButton sx={{margin: "35px 0", padding:"0"}}>
                                    <AddCircleOutlineIcon color="info"></AddCircleOutlineIcon>
                                    <Typography sx={{fontFamily: "SB sans Text", margin: "0 0 0 5px", fontSize: "12px"}}  color="info"  >
                                        Добавить делегата
                                    </Typography>
                                </MaterialButton>
                            {/*</WithPopOver>*/}
                        </Box>

                        <Stack spacing={5}>
                            <Textarea minRows={5} onChange={stringCallback(setDescription)} value={description} placeholder="Введите описание продукта" >
                                <Backdrop  open={true} >
                                    <CircularProgress />
                                </Backdrop>
                            </Textarea>
                            <Select placeholder="Выберите профиль должности" value={profile} onChange={stringSelectCallback(setProfile)}>
                                <Option value={"Junior backend developer"}>Junior backend developer</Option>
                                <Option value={"middle backend developer"}>Middle backend developer</Option>
                                <Option value={"Junior frontend developer"}>Junior frontend developer </Option>
                                <Option value={"middle frontend developer"}>Middle frontend developer</Option>
                            </Select>
                            <Input
                                value={skills}
                                onChange={stringCallback(setSkills)}
                                placeholder="Введите необходимые навыки"
                            />
                            <Stack direction="row" spacing={2}>
                                    <Button>Заполнить вручную</Button>
                                <Button loading={isLoading} onClick={onVacancyCreate}>Сгенерировать {props.finalVacancy && "заново"}</Button>
                            </Stack>
                            <MaterialButton sx={{paddingLeft: "0", width: "100px"}}>
                                <Typography sx={{fontFamily: "SB sans Text", margin: "0 0 0 5px", fontSize: "10px"}} variant="caption" gutterBottom>
                                    Тесты <Typography sx={{fontFamily: "SB sans Text", fontSize: "12px"}} variant="caption" color="info"> 0 </Typography>
                                </Typography>
                                <AddCircleOutlineIcon color="info"></AddCircleOutlineIcon>
                            </MaterialButton>
                        </Stack>

                    </Grid>
                    {props.finalVacancy &&
                        <>
                            <Grid item xs={6}>
                                <Stack spacing={2}>
                                    <Textarea minRows={17} maxRows={17} value={props.finalVacancy} onChange={stringCallback(props.setFinalVacancy)}></Textarea>
                                    <Input onChange={stringCallback(setClarification)} placeholder={"Напишите, что GigoChat должен исправить"}></Input>
                                </Stack>
                                <Button loading={isLoading} onClick={onClarification} fullWidth sx={{marginTop: "40px"}}>Отправить</Button>
                            </Grid>
                        </>

                }
                </Grid>
            </Container>
        </>
    )
}

export default DescriptionCreate