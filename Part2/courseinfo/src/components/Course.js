import React from 'react'


const Courses = ({ courses }) => {
    return (
        <div>
            <ul>
                {courses.map((course,i) =>
                    <li key={i}>
                        <Course course={course} />
                    </li>
                )}
            </ul>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            <ul>
                {parts.map((part,i) =>
                    <li key={i}>
                        <Part part={part} />
                    </li>
                )}
            </ul>
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <p>
            <strong>Total of {total} exercises</strong>
        </p>
    );
};

export default Courses