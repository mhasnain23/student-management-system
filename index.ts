import inquirer from 'inquirer';

class Student {
    private name: string;
    private id: string;
    private courses: string[];
    private balance: number;

    constructor(name: string) {
        this.name = name;
        this.id = this.generateStudentID();
        this.courses = [];
        this.balance = 10000;
    }

    private generateStudentID(): string {
        // Generate a 5-digit unique student ID
        const id = Math.floor(10000 + Math.random() * 90000).toString();
        return id;
    }

    enrollCourse(course: string): void {
        this.courses.push(course);
    }

    viewBalance(): number {
        return this.balance;
    }

    payTuition(amount: number): void {
        this.balance -= amount;
        console.log(`Paid ${amount} towards tuition. Remaining balance: ${this.balance}`);
    }

    showStatus(): void {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        console.log(`Balance: ${this.balance}`);
    }
}

// Function to prompt user for student name
async function promptForStudentName(): Promise<string> {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter student name:'
    });
    return name;
}

// Function to prompt user for course enrollment
async function promptForCourseEnrollment(): Promise<string> {
    const { course } = await inquirer.prompt({
        type: 'input',
        name: 'course',
        message: 'Enter course to enroll:'
    });
    return course;
}

// Function to prompt user for tuition payment
async function promptForTuitionPayment(): Promise<number> {
    const { amount } = await inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter amount to pay towards tuition:'
    });
    return amount;
}

// Main function to run the program
async function main() {
    const name = await promptForStudentName();
    const student = new Student(name);

    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Enroll Course', 'View Balance', 'Pay Tuition', 'Show Status', 'Exit']
        });

        switch (action) {
            case 'Enroll Course':
                const course = await promptForCourseEnrollment();
                student.enrollCourse(course);
                console.log(`Enrolled in ${course}`);
                break;
            case 'View Balance':
                console.log(`Balance: ${student.viewBalance()}`);
                break;
            case 'Pay Tuition':
                const amount = await promptForTuitionPayment();
                student.payTuition(amount);
                break;
            case 'Show Status':
                student.showStatus();
                break;
            case 'Exit':
                return;
        }
    }
}

// Run the program
main();
