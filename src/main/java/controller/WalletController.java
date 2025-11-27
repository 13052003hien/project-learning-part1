package controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import model.Wallet;
import service.WalletService;

import java.util.List;

@RestController
@RequestMapping("/api/wallets")
@CrossOrigin(origins = "http://localhost:3000")
public class WalletController {
    
    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Wallet>> getWalletsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(walletService.getAllWalletsByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Wallet> getWalletById(@PathVariable String id) {
        return walletService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}/default")
    public ResponseEntity<Wallet> getDefaultWallet(@PathVariable String userId) {
        return walletService.getDefaultWallet(userId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Wallet> createWallet(@RequestBody Wallet wallet) {
        Wallet saved = walletService.saveWallet(wallet);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Wallet> updateWallet(@PathVariable String id, @RequestBody Wallet walletDetails) {
        return walletService.findById(id)
            .map(wallet -> {
                wallet.setName(walletDetails.getName());
                wallet.setType(walletDetails.getType());
                wallet.setBalance(walletDetails.getBalance());
                wallet.setCurrency(walletDetails.getCurrency());
                wallet.setIcon(walletDetails.getIcon());
                wallet.setColor(walletDetails.getColor());
                wallet.setDescription(walletDetails.getDescription());
                wallet.setIsDefault(walletDetails.getIsDefault());
                return ResponseEntity.ok(walletService.saveWallet(wallet));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWallet(@PathVariable String id) {
        walletService.deleteWallet(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/init/{userId}")
    public ResponseEntity<String> initializeDefaultWallet(@PathVariable String userId) {
        walletService.initializeDefaultWallet(userId);
        return ResponseEntity.ok("Default wallet initialized");
    }
}
