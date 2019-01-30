export function getAgeInHours(releaseDate) {
    let d = new Date(releaseDate),
        podTime = d.getTime(),
        hoursOld = (Date.now()-podTime)/3600000;
        
    return hoursOld;
}

