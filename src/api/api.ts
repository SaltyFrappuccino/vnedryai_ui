import axios from 'axios';

export const createVacancy = (skills: string, profile: string) => {
    return axios.post<any>('https://gigachat-hr.onrender.com/vacancy/', {content:`Напиши вакансию на ${profile}. 
Нужны знания ${skills}.
Укажи все базовые Хард и Софт скиллы на подобную вакансию.`
}, {
            headers: {
                Authorization: "Bearer Y2JkYzY3ZTUtMjg2Ny00ODJkLWE1ZTYtYmE4MTliMWZkNjVhOmE5MWMxODRhLWQyNmEtNGEwNi1hYzVhLTRiYjZiODYxNDg4Zg=="}
            }
    )
}

export const clarifyVacancy = (clarification: string) => {
    return axios.post<any>('https://gigachat-hr.onrender.com/vacancy/',  clarification, {
            headers: {
                Authorization: "Bearer Y2JkYzY3ZTUtMjg2Ny00ODJkLWE1ZTYtYmE4MTliMWZkNjVhOmE5MWMxODRhLWQyNmEtNGEwNi1hYzVhLTRiYjZiODYxNDg4Zg=="}
        }
    )
}

export const getVacancies = () => {
    return axios.get<any>('https://gigachat-hr.onrender.com/vacancies/'
    )
}
export const saveVacancy = (vacancy: {
    title: string,
    positionNumber: string,
    manager: string,
    recrutor: string,
    content: string
}) => {
    return axios.post<any>('https://gigachat-hr.onrender.com/vacancies/',vacancy
    )
}
