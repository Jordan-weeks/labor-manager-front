import {
  ButtonGroup,
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  Textarea,
  useEditableControls,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useEditCommentMutation } from './tasksApiSlice'

const CommentCard = ({ comment, taskId }) => {
  const commentDate = new Date(comment.date)
  const ref = useRef(null)
  const [body, setBody] = useState(comment.body)
  const [editing, setEditing] = useState(false)

  const [
    editComment,
    { isSuccess: isEditSuccess, isError: isEditError, error: editError },
  ] = useEditCommentMutation()

  const { jobId } = useParams()

  const onEditClick = () => {
    setEditing((prev) => !prev)
  }

  const onSaveClick = async () => {
    await editComment({
      commentId: comment._id,
      jobId,
      taskId,
      commentBody: body,
    })
    setEditing((prev) => !prev)
  }
  const onCancelClick = () => {
    setEditing((prev) => !prev)
  }

  const Buttons = () => {
    if (editing) {
      return (
        <HStack placeSelf={'flex-end'}>
          <IconButton
            variant='ghost'
            aria-label='Save'
            title='Save'
            fontSize='20px'
            onClick={onSaveClick}
            icon={<FaCheck />}
          />
          <IconButton
            variant='ghost'
            aria-label='Cancel'
            title='Cancel'
            fontSize='20px'
            onClick={onCancelClick}
            icon={<FaWindowClose />}
          />
        </HStack>
      )
    } else {
      return (
        <HStack placeSelf={'flex-end'}>
          <IconButton
            variant='ghost'
            aria-label='edit'
            title='Edit'
            fontSize='20px'
            onClick={onEditClick}
            icon={<FaEdit />}
          />
          <IconButton
            variant='ghost'
            aria-label='Delete'
            title='Delete'
            fontSize='20px'
            icon={<FaTrash />}
          />
        </HStack>
      )
    }
  }
  const CommentBody = () => {
    if (editing) {
      return (
        <Textarea
          height={'fit-content'}
          resize={'none'}
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      )
    } else {
      return <Text> {comment.body} </Text>
    }
  }

  return (
    <Card>
      <CardBody>
        <HStack justify={'space-between'}>
          <Text>{comment.author}</Text>
          <Text>{commentDate.toLocaleString()}</Text>
        </HStack>
        <VStack align={'flex-start'}>
          {CommentBody()}
          {Buttons()}
        </VStack>
      </CardBody>
    </Card>
  )
}

export default CommentCard
