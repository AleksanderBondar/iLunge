import chalk from 'chalk';

export const log = (message: string, type: 'cache' | 'fetch' | 'error') => {
    const date = new Date();
    const time = chalk.gray(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    const prefix =
        type === 'fetch' ? chalk.green('FETCH') : type === 'error' ? chalk.red('ERROR') : chalk.yellow('CACHE');
    console.log(`${time} ${prefix} ${message}`);
};
