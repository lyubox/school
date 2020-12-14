class Vacation {
  constructor (organizer, destination, budget) {
    this.organizer = organizer;
    this.destination = destination;
    this.budget = budget;
    this.kids = {};
  }

  registerChild (name, grade, budget) {
    if (budget < this.budget) {
      return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
    }

    const newKid = { name, budget};

    const theKidsGrade = this.getGrade(grade);

    if (theKidsGrade.map(kid => kid.name).includes(name)) {
      return `${name} is already in the list for this ${this.destination} vacation.`;
    }
    this.kids[grade] = [...theKidsGrade, newKid];

    return this.getGradeString(grade);
  }

  getGrade (grade) {
    return this.kids[grade] || [];
  }

  removeChild (name, grade) {
    const theKidsGrade = this.getGrade(grade);

    const kidToRemove = theKidsGrade.find(k => k.name === name);

    if (!kidToRemove) {
      return `We couldn't find ${name} in ${grade} grade.`;
    }

    this.kids[grade] = theKidsGrade
      .filter(k => kidToRemove.name !== k.name);

    return getGradeString(grade);
  }

  getGradeString (grade) {
    return this.kids[grade].map(kid => `${kid.name}-${kid.budget}`);
  }

  numberOfChildren () {
    return Object.keys(this.kids)
      .flatMap(g => this.kids[g]).length;
  }

  toString () {
    if (this.numberOfChildren() === 0) {
      return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
    }

    const keys = Object.keys(this.kids)
      .sort((a, b) => a - b);

    const gradeLines = keys.map(currentGrade => {
      const kidsLines = this.kids[currentGrade]
        .map((kid, index) => `${index + 1}. ${kid.name}-${kid.budget}`);

      return [`Grade: ${currentGrade}`, ...kidsLines];
    });
    const result = [`${this.organizer} will take ${this.numberOfChildren()} children on trip to ${this.destination}`,
      ...gradeLines.flat()];

    return result.join('\n');
  }
}

let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
console.log(vacation.registerChild('Gosho', 5, 2000));
console.log(vacation.registerChild('Lilly', 6, 2100));
console.log(vacation.registerChild('Pesho', 6, 2400));
console.log(vacation.registerChild('Gosho', 5, 2000));
console.log(vacation.registerChild('Tanya', 5, 6000));
console.log(vacation.registerChild('Mitko', 10, 1590));
