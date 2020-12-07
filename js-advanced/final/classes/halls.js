function solveClasses () {
  class Hall {
    constructor (capacity, name) {
      this.capacity = capacity;
      this.name = name;
      this.events = [];
    }

    hallEvent (title) {
      if (this.events.includes(title)) {
        throw new Error('This event is already added!');
      }
      this.events.push(title);
      return 'Event is added.';
    }

    close () {
      this.events = [];
      return `${this.name} hall is closed.`;
    }

    toString () {
      const capacity = `${this.name} hall - ${this.capacity}`;
      const message = this.events.length > 0
        ? [
          capacity,
          `Events: ${this.events.join(', ')}`
        ]
        : [capacity];

      return message.join('\n');
    }
  }
  class MovieTheater extends Hall {
    constructor (capacity, name, screenSize) {
      super(capacity, name);
      this.screenSize = screenSize;
    }

    close () {
      return `${super.close()}Аll screenings are over.`;
    }

    toString () {
      return [
        super.toString(),
        `${this.name} is a movie theater with ${this.screenSize} screensize and ${this.capacity} seats capacity.`
      ].join('\n');
    }
  }
  class ConcertHall extends Hall {
    hallEvent (title, performers) {
      this.performers = performers;
      return super.hallEvent(title);
    }

    close () {
      return `${super.close()}Аll performances are over.`;
    }

    toString () {
      return this.events.length > 0
        ? [
          super.toString(),
          `Performers: ${this.performers.join(' ,')}.`
        ].join('\n')
        : super.toString();
    }
  }

  return {
    Hall,
    MovieTheater,
  ConcertHall};
}
const classes = solveClasses();
const hall = new classes.Hall(20, 'Main');
console.log(hall.hallEvent('Breakfast Ideas'));
console.log(hall.hallEvent('Annual Charity Ball'));
console.log(hall.toString());
console.log(hall.close());
const movieHall = new classes.MovieTheater(10, 'Europe', '10m');
console.log(movieHall.hallEvent('Top Gun: Maverick'));
console.log(movieHall.toString());
const concert = new classes.ConcertHall(5000, 'Diamond');
console.log(concert.hallEvent('The Chromatica Ball', ['LADY GAGA']));
console.log(concert.toString());
console.log(concert.close());
console.log(concert.toString());
