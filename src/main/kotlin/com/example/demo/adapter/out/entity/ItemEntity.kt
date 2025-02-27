package com.example.demo.adapter.out.entity

import lombok.Builder
import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document(collection = "TIL")
@Builder
data class ItemEntity(
    @Id
    val id: String = ObjectId.get().toString(),
    val text: String,
    val source: String,
    val category: String,
    val votesInteresting: String,
    val votesMindBlowing: String,
    val userNote: String?,
    var createdIn: LocalDateTime = LocalDateTime.now()
)