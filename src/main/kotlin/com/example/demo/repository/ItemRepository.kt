package com.example.demo.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.*

interface ItemRepository : MongoRepository<ItemEntity, String> {
    override fun findAll(pageable: Pageable): Page<ItemEntity>
    fun findByCategory(category: String, pageable: Pageable): Page<ItemEntity>
    fun save(item: ItemEntity) : ItemEntity
    override fun findById(id: String): Optional<ItemEntity>
    override fun deleteById(id: String)
}