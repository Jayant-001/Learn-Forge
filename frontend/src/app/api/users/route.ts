import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

export async function GET(request: Request) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileData);
    return Response.json({users})
}

export async function POST(request: Request) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileData);
  const newUser = { id: Date.now(), ...request.body };
  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return Response.json(newUser, { status: 201 })
}