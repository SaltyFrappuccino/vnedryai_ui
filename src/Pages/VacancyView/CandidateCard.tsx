import Avatar from '@mui/joy/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import TelegramIcon from '@mui/icons-material/Telegram';
import SchoolIcon from '@mui/icons-material/School';
import CachedIcon from '@mui/icons-material/Cached';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';

import {ICandidate} from "../../types/types.ts";
import {WithPopOver} from "../../HOCs/WithPopOver";
import {Button} from "@mui/material";
import {getPhotoUrl} from "../../randomizers/rundom.ts";
import {Stack} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import React, {MouseEventHandler} from "react";


function CandidateCard(props: any) {
    const photo = getPhotoUrl()
    const nav = useNavigate()

    const getpTeamAnalyseColor = ()=>{
        console.log(props.teamProfileMatch)
            if(props.teamProfileMatch < 10) return "error"
            if(props.teamProfileMatch < 80) return "warning"
            return "success"
    }

    const getpAcorrdanceColor = ()=>{
        console.log(props.resumeMatching)
            if(props.resumeMatching < 10) return "error.main"
            if(props.resumeMatching < 80) return "warning.main"
            return "success.main"
    }
    const onCandidateView = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
            nav("/candidateview", {state: {
                    candidate: {
                        id: props.id,
                        vacancyId: props.vacancyId,
                        candidate_id: props.candidate_id,
                        photo: photo,
                        fio: props.fio,
                        accordance: props.resumeMatching,
                        teamAnalys: props.teamProfileMatch,
                    }
                }})
    }
    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    width: 500,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={props.photo_url} size="lg" onClick={onCandidateView} sx={{cursor: "pointer"}}/>
                    {/*<AvatarGroup size="sm" sx={{ '--Avatar-size': '28px' }}>*/}
                    {/*    <Avatar src="/static/images/avatar/2.jpg" />*/}
                    {/*    <Avatar src="/static/images/avatar/3.jpg" />*/}
                    {/*    <Avatar src="/static/images/avatar/4.jpg" />*/}
                    {/*    <Avatar>+4K</Avatar>*/}
                    {/*</AvatarGroup>*/}
                    <Box>
                        <Stack direction="row" spacing={1}>
                            {(props.resumeMatching >= 0)?
                                <WithPopOver text={props.resumeMatching + "% соответствия резюме вакансии" }>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <Typography sx={{fontFamily: "SB sans Text"}} component="div"><Box sx={{color: getpAcorrdanceColor()}}>{props.resumeMatching}%</Box></Typography>
                                    </Button>
                                </WithPopOver> : ""
                            }
                            {(props.teamProfileMatch >= 0)?
                                <WithPopOver text={props.teamProfileMatch + "% соответствия профилю команды" }>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <ThumbUpOffAltIcon color={getpTeamAnalyseColor()}></ThumbUpOffAltIcon>
                                    </Button>
                                </WithPopOver> : ""

                            }
                            {props.recruiterSelection == 1 &&
                                <WithPopOver text={"Отобран рекрутером" }>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <Typography sx={{fontFamily: "SB sans Text"}} component="div"><Box sx={{color: "success.main"}}>HR</Box></Typography>
                                    </Button>
                                </WithPopOver>
                            }
                            {props.interviewPassed == 1 &&
                                <WithPopOver text={"Прошел интервью" }>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <MicIcon color={"success"} />
                                    </Button>
                                </WithPopOver>
                            }
                            {/*{props.flags?.includes("STUDENT") &&*/}
                            {/*    <WithPopOver text={"Студент"}>*/}
                            {/*        <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>*/}
                            {/*            <SchoolIcon color={"warning"} />*/}
                            {/*        </Button>*/}
                            {/*    </WithPopOver>*/}
                            {/*}*/}
                            {props.noTelegram == 1 &&
                                <WithPopOver text={"Не указан Telegram, можно позвонить" }>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <TelegramIcon color={"error"} />
                                    </Button>
                                </WithPopOver>
                            }

                            {props.frequentJobChanges == 1 &&
                                <WithPopOver text={"Более 2 случаев со стажем <6 месяцев для одного места, включая текущий стаж"}>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <CachedIcon color={"error"} />
                                    </Button>
                                </WithPopOver>
                            }
                            {props.interviewFailed == 1 &&
                                <WithPopOver text={"Не пришел на интервью"}>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <MicOffIcon color={"error"} />
                                    </Button>
                                </WithPopOver>
                            }
                            {props.noHigherEducation == 1 &&
                                <WithPopOver text={"Нет высшего образования"}>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <SchoolIcon color={"error"} />
                                    </Button>
                                </WithPopOver>
                            }
                            {props.experienceMismatch == 1 &&
                                <WithPopOver text={"Опыт работы не соответствует"}>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <BusinessCenterIcon color={"error"} />
                                    </Button>
                                </WithPopOver>
                            }
                            {props.regionMismatch == 1 &&
                                <WithPopOver text={"Регион проживания отличается от вакансии"}>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <HomeIcon color={"error"} />
                                    </Button>
                                </WithPopOver>
                            }
                            {props.gigaRejected == 1 &&
                                <WithPopOver text={"Отклонен Гига Чатом"}>
                                    <Button sx={{padding: "0", margin: "0", display: "flex", maxWidth: "20px", minWidth: "30px"}}>
                                        <DeleteIcon color={"error"} />
                                    </Button>
                                </WithPopOver>
                            }

                        </Stack>
                    </Box>
                </Box>
                <CardContent onClick={onCandidateView} sx={{cursor: "pointer"}}>
                    <Typography sx={{fontFamily: "SB sans Text"}} level="title-lg">{props.fio}</Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default CandidateCard