import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'
import {
  RiCloseCircleLine,
  RiDeleteBin5Line,
  RiEditLine,
  RiSave3Line,
} from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import { selectUserId } from '../../auth/authSlice'
import { useGetUsernamesQuery } from '../jobsApiSlice'
import styles from './styles/comment-card.module.css'
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
} from './tasksApiSlice'

const CommentBody = ({ editing, body, setBody }) => {
  const cx = classNames.bind(styles)
  const ref = useRef(null)

  useEffect(() => {
    if (editing) {
      const end = ref.current.value.length
      ref.current.setSelectionRange(end, end)
      ref.current.focus()
    }
  }, [editing])

  if (editing) {
    return (
      <div>
        <TextareaAutosize
          className={cx('editing-body')}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          minRows={3}
          maxRows={5}
          ref={ref}
        />
      </div>

      // <textarea
      //
      //   height={'fit-content'}
      //   resize={'none'}
      //
      //   value={body}
      //
      // />
    )
  } else {
    return <div className={cx('comment-body')}> {body} </div>
  }
}

const CommentCard = ({ comment, taskId }) => {
  const cx = classNames.bind(styles)
  const commentDate = new Date(comment.date)
  const userId = useSelector(selectUserId)
  const { jobId } = useParams()
  const [body, setBody] = useState(comment?.body)
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

  // useEffect(() => {
  //   if (editing) {
  //     const end = ref.current.value.length
  //     ref.current.setSelectionRange(end, end)
  //     ref.current.focus()
  //   }
  // }, [editing])

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
        <div className={cx('icon-container')}>
          <RiSave3Line onClick={onSaveClick} />
          <RiCloseCircleLine onClick={onCancelClick} />
        </div>
      )
    } else {
      return (
        <div className={cx('icon-container')}>
          <RiEditLine onClick={onEditClick} />
          <RiDeleteBin5Line onClick={onDeleteClick} />
        </div>
      )
    }
  }

  return (
    <div className={cx('comment-card')}>
      <div>{authorName.fullName}</div>
      <div>{!comment.edited ? null : 'Edited at'}</div>
      <div>{commentDate.toLocaleString()}</div>
      <CommentBody editing={editing} body={body} setBody={setBody} />
      {isAuthor ? <Buttons /> : null}
    </div>
  )
}

export default CommentCard
