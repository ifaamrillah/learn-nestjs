import { IsAscii, IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @IsAscii({ message: 'Title must be in ASCII Format' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @Length(3, 255, {
    message: 'Description must be between 3 and 255 characters',
  })
  @IsNotEmpty({ message: 'Description is required' })
  readonly description: string;
}
