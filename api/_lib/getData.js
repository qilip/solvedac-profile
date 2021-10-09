import axios from 'axios';

const solved = axios.create({
  baseURL: 'https://solved.ac/api/v3/user',
  timeout: 3000,
  headers: {'Content-Type': 'application/json'}
});

async function getUserInfo(handle){
  const res = await solved.get('/show', { params: { handle } });
  return res.data;
}

async function getUserProblem(handle){
  const res = await solved.get('/problem_stats', { params: { handle } });
  return res.data;
}

export async function getUserData(handle){
  const res = await Promise.all([
    getUserInfo(handle),
    getUserProblem(handle),
  ]);
  const info = res[0];
  const problem = res[1];
  info['problem_stats'] = problem;
  return info;
}
