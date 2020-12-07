class Movie {
  constructor (movieName, ticketPrice) {
    this.movieName = movieName;
    this.ticketPrice = Number(ticketPrice);
    this.screenings = [];
    this.totalProfit = 0;
    this.totalSold = 0;
  }

  newScreening (date, hall, description) {
    const record = this.screenings.find(s => s.date === date && s.hall === hall);

    if (record) {
      throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
    }

    this.screenings.push({
      date,
      hall,
    description});

    return `New screening of ${this.movieName} is added.`;
  }

  endScreening (date, hall, soldTickets) {
    const record = this.screenings.find(s => s.date === date && s.hall === hall);

    if (!record) {
      throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`);
    }

    const currentProfit = this.ticketPrice * soldTickets;
    this.totalProfit += currentProfit;
    this.totalSold += soldTickets;

    this.screenings = this.screenings.filter(s => s.date !== date || s.hall !== hall);

    return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`;
  }

  toString () {
    this.screenings.sort((a, b) => a.hall.localeCompare(b.hall));

    const screeningLines = this.screenings.length === 0
      ? ['No more screenings!']
      : this.screenings.map(s => `${s.hall} - ${s.date} - ${s.description}`);

    return [
      `${this.movieName} full information:`,
      `Total profit: ${this.totalProfit.toFixed(0)}$`,
      `Sold Tickets: ${this.totalSold}`,
      'Remaining film screenings:',
      ...screeningLines
    ].join('\n');
  }
}

const m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', '3D'));
console.log(m.newScreening('October 3, 2020', 'Main', 'regular'));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', '3D'));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', 'regular');
m.newScreening('October 5, 2020', 'Main', 'regular');
m.newScreening('October 3, 2020', '235', 'regular');
m.newScreening('October 4, 2020', 'Main', 'regular');
console.log(m.toString());
