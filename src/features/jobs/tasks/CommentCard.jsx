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
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserId } from '../../auth/authSlice'
import { useGetUsernamesQuery } from '../jobsApiSlice'
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
} from './tasksApiSlice'

const CommentCard = ({ comment, taskId }) => {
  const commentDate = new Date(comment.date)
  const ref = useRef(null)
  const userId = useSelector(selectUserId)
  const { jobId } = useParams()
  const [body, setBody] = useState(comment.body)
  const [editing, setEditing] = useState(false)

  const {
    data,
    isSuccess: isQuerySuccess,
    error,
    isLoading: isQueryLoading,
  } = useGetUsernamesQuery(jobId)

  const authorName = data?.find(({ userId }) => userId === comment.author)
  let isAuthor = false
  if (userId === comment.author) isAuthor = true

  const [
    editComment,
    { isSuccess: isEditSuccess, isError: isEditError, error: editError },
  ] = useEditCommentMutation()
  const [
    deleteComment,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteCommentMutation()

  const onEditClick = () => {
    setEditing((prev) => !prev)
    setBody(comment.body)
  }
  useEffect(() => {
    if (editing) {
      const end = ref.current.value.length
      ref.current.setSelectionRange(end, end)
      ref.current.focus()
    }
  }, [editing])

  const onSaveClick = async () => {
    await editComment({
      commentId: comment._id,
      jobId,
      taskId,
      commentBody: body,
      userId,
    })
    setEditing((prev) => !prev)
  }
  const onCancelClick = () => {
    setEditing((prev) => !prev)
  }
  const onDeleteClick = async () => {
    await deleteComment({ jobId, taskId, commentId: comment._id, userId })
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
            onClick={onDeleteClick}
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
          ref={ref}
        />
      )
    } else {
      return <Text> {comment.body} </Text>
    }
  }

  if (isQueryLoading) return <div>Loading...</div>
  else {
    return (
      <Card>
        <CardBody>
          <HStack justify={'space-between'}>
            <Text>{authorName.fullName}</Text>
            <HStack>
              <Text>{!comment.edited ? null : 'Edited at'}</Text>
              <Text>{commentDate.toLocaleString()}</Text>
            </HStack>
          </HStack>
          <VStack align={'flex-start'}>
            {CommentBody()}
            {isAuthor ? Buttons() : null}
          </VStack>
        </CardBody>
      </Card>
    )
  }
}

export default CommentCard
