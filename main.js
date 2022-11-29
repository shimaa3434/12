const token = "fc4c81ec0c264ba899298d38b242e95c";
let baseurl= "https://api.football-data.org"

// /v4/competitions/{id}/matches

const getStandings = ()=>{
    const url = `${baseurl}/v4/competitions/2000/standings`
    axios.get(url, {
        headers: {
            "X-Auth-Token": `${token}`
        }
    })
    .then((response)=>{
        const standings = response.data.standings
        document.getElementById('standings').innerHTML = ''
        for(sta of standings){
            let tableContent = ""
            
            for(row of sta.table){
                tableContent +=    `
                <li class="list-group-item">
                    <div class="row m-0 ">
                        <div class="col-sm-4  d-flex align-items-center justify-content-center">
                            <span class="flag">
                                <img class= 'rounded-circle border border-2' src="${row.team.crest}" alt="">
                            </span>
                            <h5 class="text-uppercase fw-bold m-auto">${row.team.tla}</h5>
                        </div>
                        <div class="col-2 text-center m-auto">${row.won}</div>
                        <div class="col-2 text-center m-auto">${row.lost}</div>
                        <div class="col-2 text-center m-auto">${row.draw}</div>
                        <div class="col-2 text-center m-auto"><b>${row.points}</b></div>
                    </div>
                </li>
                `
            }

            const content = `
            <div class="col-md-6 col-sm-12 mb-5">
            <div class="card shadow">
                <div class="card-header bg-primary text-white border-0 text-center">
                     <b>${sta.group}</b>
                </div>
                <div class="row bg-items  m-0 ">
                   <div class="col-sm-4 text-center">الفريق</div>
                   <div class="col-2 text-center text-uppercase">w</div>
                   <div class="col-2 text-center text-uppercase">l</div>
                   <div class="col-2 text-center text-uppercase">d</div>
                   <div class="col-2 text-center text-uppercase">pts</div>
                </div>
                <!-- teams -->
                <ul class="list-group list-group-flush">
                   ${tableContent}
                </ul>
                 <!-- teams -->
            </div>
        </div>
            
            `
            document.getElementById('standings').innerHTML += content
        }
    })
    
}
const getMatches= ()=>{
    const url = `${baseurl}/v4/competitions/2000/matches`
    axios.get(url, {
        headers: {
            "X-Auth-Token": `${token}`
        }
    })
    .then ((res)=>{
        console.log(res.data)
        const matches = res.data.matches
        document.getElementById('matches').innerHTML = ''
        for(match of matches){
            const homeTeam= match.homeTeam
            const awayTeam= match.awayTeam
            const utcDate = match.utcDate
            const matchTime= new Date(utcDate)
            const dateString = matchTime.getUTCFullYear() + '/' + (matchTime.getUTCMonth() + 1) + '/' + matchTime.getUTCDate()
            const dateTime= matchTime.getUTCHours() + ':' + matchTime.getUTCMinutes() + ":" + matchTime.getUTCSeconds()
            if(homeTeam.tla == null){
                continue
            }
            const contentMatch = `
            <div class="col-sm-12 mb-3">
            <div class="card shadow rounded-pill overflow-hidden">
                <div class="card-body p-0 ">
                    <div class="row ">
                        <!-- first team col -->
                        <div class="col-sm-3 py-3 border-left bg-primary d-flex align-items-center justify-content-center flex-column">
                            <span class="flag">
                                <img class= 'rounded-circle img-thumbnail img-fluid' src="${homeTeam.crest}" alt="">
                            </span>
                            <h5 class="text-uppercase fw-bold m-auto text-white">${homeTeam.tla}</h5>
                        </div>
                         <!-- first team col -->
                         <!-- match info col -->
                        <div class="col-sm-6  py-3 d-flex align-items-center justify-content-center flex-column">
                                <h6>${match.group}</h6>
                                <div class= 'row d-flex align-items-center justify-content-between'>
                                    <div class= 'col-sm-4 me-auto'>
                                        <h3> ${match.score.fullTime.home ??  "-"} </h3>
                                    </div>
                                    <div class= 'col-sm-4'>
                                        <h1>X</h1>
                                    </div>
                                    <div class= 'col-sm-4 ms-auto'>
                                        <h3> ${match.score.fullTime.away ?? "-"} </h3>
                                    </div>
                                </div>
                                <h6>${dateString}</h6>
                                <h5>${dateTime}</h5>
                        </div>
                        <!-- match info col -->
                          <!-- second team col -->
                        <div class="col-sm-3  py-3 border-right bg-primary d-flex align-items-center justify-content-center flex-column">
                            <span class="flag">
                                <img class= 'rounded-circle img-thumbnail img-fluid' src="${awayTeam.crest}" alt="">
                            </span>
                            <h5 class="text-uppercase fw-bold m-auto text-white">${awayTeam.tla}</h5>
                        </div>
                         <!-- second team col -->
                    </div>
                </div>
            </div>
        </div>`
        document.getElementById('matches').innerHTML += contentMatch
        }
    })
}
getStandings()
getMatches()